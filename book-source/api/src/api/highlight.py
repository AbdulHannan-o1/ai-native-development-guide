import logging
from fastapi import APIRouter, HTTPException, Request
from ..models.data_models import AIRequest, AIResponse, ErrorResponse
from ..services.ai_agent import ai_agent
from ..services.api_key_manager import api_key_manager
from typing import Optional

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/highlight", response_model=AIResponse, responses={
    400: {"model": ErrorResponse},
    401: {"model": ErrorResponse},
    403: {"model": ErrorResponse},
    500: {"model": ErrorResponse}
})
async def highlight_content(request: AIRequest, http_request: Request):
    # T021 [US1] Implement input guardrails: Handled by Pydantic validation in AIRequest model
    # and explicit checks below.
    if not request.content.value:
        logger.warning(f"Bad Request: Highlighted content cannot be empty from {http_request.client.host}")
        raise HTTPException(
            status_code=400,
            detail=ErrorResponse(error="Bad Request", details="Highlighted content cannot be empty.").dict()
        )
    
    # Determine user ID for API key management.
    # In a real app, this would come from an authenticated session.
    # For now, we'll use a simple identifier.
    user_id = http_request.client.host if http_request.client else "unknown_user"

    # API Key Management
    if request.api_key:
        # User provided their own API key
        if not api_key_manager.is_custom_key_valid(request.api_key):
            logger.warning(f"Unauthorized: Invalid custom API key from {user_id}")
            raise HTTPException(
                status_code=401,
                detail=ErrorResponse(error="Unauthorized", details="Invalid custom API key provided.").dict()
            )
        pass
    else:
        # Use default API key, check limits
        if not api_key_manager.check_and_increment_usage(user_id):
            logger.warning(f"Forbidden: Default API key limit exceeded for {user_id}")
            raise HTTPException(
                status_code=403,
                detail=ErrorResponse(error="Forbidden", details="Default API key limit exceeded. Please provide your own API key.").dict()
            )

    try:
        response = await ai_agent.process_highlighted_content(request.content, request.api_key, request.model)
        logger.info(f"AI response generated for {user_id}: {response.explanation[:50]}...")
        return response
    except ValueError as e:
        logger.error(f"AI Processing Error for {user_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(error="AI Processing Error", details=str(e)).dict()
        )
    except Exception as e:
        logger.exception(f"Internal Server Error for {user_id}")
        raise HTTPException(
            status_code=500,
            detail=ErrorResponse(error="Internal Server Error", details=str(e)).dict()
        )
