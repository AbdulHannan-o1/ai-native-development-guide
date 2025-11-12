#!/usr/bin/env bash
# Validate Python code blocks in persistent sandbox container

set -euo pipefail

CONTAINER_NAME="python-sandbox-validator"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Usage
usage() {
    echo "Usage: $0 <chapter-path> [output-dir]"
    echo ""
    echo "Arguments:"
    echo "  chapter-path   Path to chapter directory (e.g., book-source/docs/04-Python-Fundamentals/14-data-types)"
    echo "  output-dir     Optional output directory (default: validation-output)"
    echo ""
    echo "Examples:"
    echo "  $0 book-source/docs/04-Python-Fundamentals/14-data-types"
    echo "  $0 book-source/docs/04-Python-Fundamentals/14-data-types audit-results"
    exit 3
}

# Check arguments
if [ $# -lt 1 ]; then
    echo "❌ Error: Missing chapter path"
    usage
fi

CHAPTER_PATH="$1"
OUTPUT_DIR="${2:-validation-output}"

# Validate chapter path exists
if [ ! -d "${CHAPTER_PATH}" ]; then
    echo "❌ Error: Chapter directory not found: ${CHAPTER_PATH}"
    exit 3
fi

# Get absolute paths
CHAPTER_PATH_ABS="$(cd "${CHAPTER_PATH}" && pwd)"
OUTPUT_DIR_ABS="$(mkdir -p "${OUTPUT_DIR}" && cd "${OUTPUT_DIR}" && pwd)"

# Extract chapter name for report
CHAPTER_NAME=$(basename "${CHAPTER_PATH_ABS}")

echo "🐍 Python Sandbox Validation"
echo "============================="
echo ""
echo "📂 Chapter: ${CHAPTER_NAME}"
echo "📁 Path: ${CHAPTER_PATH_ABS}"
echo ""

# Check if container exists and is running
if ! docker ps -f name="^${CONTAINER_NAME}$" | grep -q "${CONTAINER_NAME}"; then
    echo "❌ Error: Sandbox container '${CONTAINER_NAME}' not running"
    echo ""
    echo "🔧 Setup sandbox first:"
    echo "   bash scripts/setup-sandbox.sh"
    exit 2
fi

# Copy validation script into container
echo "📤 Copying validation script to container..."
docker cp "${SCRIPT_DIR}/extract_and_validate.py" \
    "${CONTAINER_NAME}:/tmp/extract_and_validate.py"

# Create temp directory in container for chapter files
docker exec "${CONTAINER_NAME}" mkdir -p /tmp/chapter

# Copy chapter files to container
echo "📤 Copying chapter files to container..."
docker cp "${CHAPTER_PATH_ABS}/." "${CONTAINER_NAME}:/tmp/chapter/"

# Run validation inside container
echo "🔍 Running validation..."
echo ""

# Execute Python validator
if docker exec "${CONTAINER_NAME}" python /tmp/extract_and_validate.py \
    /tmp/chapter \
    /tmp/validation-output \
    "${CHAPTER_NAME}"; then
    VALIDATION_EXIT_CODE=0
else
    VALIDATION_EXIT_CODE=1
fi

# Copy results back to host
echo ""
echo "📥 Copying results back..."
docker cp "${CONTAINER_NAME}:/tmp/validation-output/." "${OUTPUT_DIR_ABS}/"

# Cleanup temp files in container
docker exec "${CONTAINER_NAME}" rm -rf /tmp/chapter /tmp/validation-output /tmp/extract_and_validate.py

# Display summary
REPORT_FILE="${OUTPUT_DIR_ABS}/${CHAPTER_NAME}-report.md"

if [ -f "${REPORT_FILE}" ]; then
    echo ""
    echo "📊 Validation Summary"
    echo "====================="
    echo ""

    # Extract key metrics from report
    grep -E "^\*\*Total Code Blocks:\*\*|^\*\*Syntax Errors:\*\*|^\*\*Runtime Errors:\*\*|^\*\*Success Rate:\*\*" "${REPORT_FILE}" || true

    echo ""
    echo "📄 Detailed report: ${REPORT_FILE}"
    echo ""
fi

# Return appropriate exit code
if [ ${VALIDATION_EXIT_CODE} -eq 0 ]; then
    echo "✅ Validation complete: All code blocks passed"
    exit 0
else
    echo "⚠️  Validation complete: Errors found (see report)"
    exit 1
fi
