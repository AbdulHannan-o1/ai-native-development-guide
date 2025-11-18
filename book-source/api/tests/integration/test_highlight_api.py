import pytest
from httpx import AsyncClient
from book_source.api.src.main import app
from book_source.api.src.services.api_key_manager import api_key_manager

@pytest.fixture(autouse=True)
def reset_api_key_manager():
    """Resets the API key manager before each test to ensure isolation."""
    api_key_manager.user_usage = {}
    yield

@pytest.mark.asyncio
async def test_root_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "FastAPI backend for Highlight AI Dialogue is running!"}

@pytest.mark.asyncio
async def test_highlight_endpoint_no_api_key_within_limit():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Assuming default limit is 10, make a few requests
        for i in range(api_key_manager.default_limit - 1):
            response = await client.post("/ai/highlight", json={
                "content": {"type": "TEXT", "value": f"Test content {i}"}
            })
            assert response.status_code == 200
            assert "explanation" in response.json()
        
        # Last request within limit
        response = await client.post("/ai/highlight", json={
            "content": {"type": "TEXT", "value": "Final test content"}
        })
        assert response.status_code == 200
        assert "explanation" in response.json()

@pytest.mark.asyncio
async def test_highlight_endpoint_no_api_key_limit_exceeded():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Exceed the default limit
        for _ in range(api_key_manager.default_limit):
            await client.post("/ai/highlight", json={
                "content": {"type": "TEXT", "value": "Content"}
            })
        
        response = await client.post("/ai/highlight", json={
            "content": {"type": "TEXT", "value": "Content after limit"}
        })
    assert response.status_code == 403
    assert response.json()["detail"]["error"] == "Forbidden"
    assert "limit exceeded" in response.json()["detail"]["details"]

@pytest.mark.asyncio
async def test_highlight_endpoint_with_valid_custom_api_key():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/ai/highlight", json={
            "content": {"type": "TEXT", "value": "Custom key content"},
            "apiKey": "valid_custom_key_123"
        })
    assert response.status_code == 200
    assert "explanation" in response.json()

@pytest.mark.asyncio
async def test_highlight_endpoint_with_invalid_custom_api_key():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/ai/highlight", json={
            "content": {"type": "TEXT", "value": "Invalid key content"},
            "apiKey": "" # Empty key is considered invalid by is_custom_key_valid
        })
    assert response.status_code == 401
    assert response.json()["detail"]["error"] == "Unauthorized"
    assert "Invalid custom API key" in response.json()["detail"]["details"]

@pytest.mark.asyncio
async def test_highlight_endpoint_empty_content():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/ai/highlight", json={
            "content": {"type": "TEXT", "value": ""}
        })
    assert response.status_code == 400
    assert response.json()["detail"]["error"] == "Bad Request"
    assert "content cannot be empty" in response.json()["detail"]["details"]

@pytest.mark.asyncio
async def test_highlight_endpoint_unsupported_content_type():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/ai/highlight", json={
            "content": {"type": "UNSUPPORTED", "value": "Some content"}
        })
    assert response.status_code == 422 # Pydantic validation error
    assert "value_error" in response.json()["detail"][0]["type"]
