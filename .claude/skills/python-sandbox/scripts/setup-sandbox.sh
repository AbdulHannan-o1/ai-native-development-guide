#!/usr/bin/env bash
# Setup persistent Python 3.14 sandbox container with UV package manager

set -euo pipefail

CONTAINER_NAME="python-sandbox-validator"
PYTHON_VERSION="3.14"
IMAGE="python:${PYTHON_VERSION}-slim"

echo "🐍 Python Sandbox Setup"
echo "======================="
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed or not in PATH"
    echo "   Install Docker: https://docs.docker.com/get-docker/"
    exit 2
fi

# Check if container already exists
if docker ps -a -f name="^${CONTAINER_NAME}$" | grep -q "${CONTAINER_NAME}"; then
    echo "📦 Container '${CONTAINER_NAME}' already exists"

    # Check if it's running
    if docker ps -f name="^${CONTAINER_NAME}$" | grep -q "${CONTAINER_NAME}"; then
        echo "✅ Container is running"
        CONTAINER_ID=$(docker ps -f name="^${CONTAINER_NAME}$" --format "{{.ID}}")
        echo "   Container ID: ${CONTAINER_ID}"
        echo ""
        echo "🎯 Ready to validate! Use:"
        echo "   bash scripts/validate-in-sandbox.sh <chapter-path>"
        exit 0
    else
        echo "⚠️  Container exists but is stopped. Starting..."
        docker start "${CONTAINER_NAME}" > /dev/null
        echo "✅ Container started"
        CONTAINER_ID=$(docker ps -f name="^${CONTAINER_NAME}$" --format "{{.ID}}")
        echo "   Container ID: ${CONTAINER_ID}"
        echo ""
        echo "🎯 Ready to validate!"
        exit 0
    fi
fi

echo "🔨 Creating new sandbox container..."
echo "   Image: ${IMAGE}"
echo "   Container: ${CONTAINER_NAME}"
echo ""

# Pull Python image if not exists
if ! docker images | grep -q "python.*${PYTHON_VERSION}"; then
    echo "📥 Pulling Python ${PYTHON_VERSION} image (this may take a minute)..."
    docker pull "${IMAGE}"
    echo ""
fi

# Create container with persistent setup
echo "⚙️  Creating container..."
CONTAINER_ID=$(docker run -d \
    --name "${CONTAINER_NAME}" \
    --restart unless-stopped \
    "${IMAGE}" \
    tail -f /dev/null)

echo "✅ Container created: ${CONTAINER_ID:0:12}"
echo ""

# Install UV package manager
echo "📦 Installing UV package manager..."
docker exec "${CONTAINER_NAME}" bash -c "pip install --no-cache-dir uv --quiet"
echo "✅ UV installed"
echo ""

# Install common dependencies
echo "📦 Installing common Python dependencies..."
docker exec "${CONTAINER_NAME}" bash -c \
    "uv pip install --system --no-cache pytest typing-extensions --quiet"
echo "✅ Dependencies installed"
echo ""

# Verify Python version
PYTHON_VER=$(docker exec "${CONTAINER_NAME}" python --version)
UV_VER=$(docker exec "${CONTAINER_NAME}" uv --version)
echo "🎉 Sandbox Setup Complete!"
echo ""
echo "📊 Environment Details:"
echo "   ${PYTHON_VER}"
echo "   ${UV_VER}"
echo "   Container: ${CONTAINER_NAME}"
echo "   Status: Running"
echo ""
echo "🎯 Ready to validate! Use:"
echo "   bash scripts/validate-in-sandbox.sh <chapter-path>"
echo ""
echo "💡 Tip: This container is persistent. No need to recreate for future validations!"
