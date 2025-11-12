#!/usr/bin/env bash
# Reset Python sandbox container (remove and recreate)

set -euo pipefail

CONTAINER_NAME="python-sandbox-validator"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔄 Python Sandbox Reset"
echo "======================="
echo ""

# Check if container exists
if docker ps -a -f name="^${CONTAINER_NAME}$" | grep -q "${CONTAINER_NAME}"; then
    echo "🗑️  Removing existing container '${CONTAINER_NAME}'..."

    # Stop if running
    if docker ps -f name="^${CONTAINER_NAME}$" | grep -q "${CONTAINER_NAME}"; then
        docker stop "${CONTAINER_NAME}" > /dev/null
    fi

    # Remove container
    docker rm "${CONTAINER_NAME}" > /dev/null
    echo "✅ Container removed"
    echo ""
else
    echo "ℹ️  No existing container found"
    echo ""
fi

# Recreate using setup script
echo "🔨 Creating fresh sandbox..."
echo ""
bash "${SCRIPT_DIR}/setup-sandbox.sh"
