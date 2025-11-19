from pydantic import BaseModel, Field
from typing import Optional, Literal

class HighlightedContent(BaseModel):
    type: Literal["TEXT", "CODE", "IMAGE"] = Field(..., description="Type of the highlighted content.")
    value: str = Field(..., min_length=1, description="The actual content. For images, this could be a URL or Base64 string.")

class AIRequest(BaseModel):
    content: HighlightedContent
    api_key: Optional[str] = Field(None, description="Optional. User's custom API key. If None, default key is used.")
    model: Optional[str] = Field(None, description="Optional. The AI model to use for the request.")
    custom_prompt: Optional[str] = Field(None, description="Optional. User's custom prompt to append to the agent's instruction.")

class AIResponse(BaseModel):
    explanation: str = Field(..., min_length=1, description="A simple, analogy-based explanation of the highlighted content.")
    implementation: Optional[str] = Field(None, description="Step-by-step guidance for implementation, if applicable.")
    example: Optional[str] = Field(None, description="Illustrative examples, if applicable.")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="A brief error message.")
    details: Optional[str] = Field(None, description="More detailed information about the error.")