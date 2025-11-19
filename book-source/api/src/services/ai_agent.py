from typing import Optional
from openai import OpenAI
from ..services.ai_agent_config import client as default_openai_client, OPENAI_API_BASE
from ..models.data_models import HighlightedContent, AIResponse

class AIAgent:
    def __init__(self):
        # The default client is initialized once
        self.default_client = default_openai_client

    async def process_highlighted_content(
        self, content: HighlightedContent, optional_api_key: Optional[str] = None, model: str = "gemini-2.5-flash", custom_prompt: Optional[str] = None
    ) -> AIResponse:
        # Determine which client to use
        current_client = self.default_client
        if optional_api_key:
            # If a custom API key is provided, create a new client instance for this request
            current_client = OpenAI(
                base_url=OPENAI_API_BASE,
                api_key=optional_api_key,
            )

        prompt_messages = self._construct_prompt(content, custom_prompt)

        try:
            response = current_client.chat.completions.create(
                model=model,
                messages=prompt_messages,
                response_format={"type": "json_object"} # Request JSON object
            )
            
            # Output Guardrail: Ensure JSON structure is valid and contains 'explanation'
            ai_output = response.choices[0].message.content
            
            # Attempt to parse the JSON output
            import json
            parsed_output = json.loads(ai_output)

            explanation = parsed_output.get("explanation")
            implementation = parsed_output.get("implementation")
            example = parsed_output.get("example")

            if not explanation:
                raise ValueError("AI response missing required 'explanation' field.")

            return AIResponse(
                explanation=explanation,
                implementation=implementation,
                example=example,
            )
        except Exception as e:
            # Handle potential errors from AI API or JSON parsing
            raise ValueError(f"Failed to get valid AI response: {e}")

    def _construct_prompt(self, content: HighlightedContent, custom_prompt: Optional[str] = None) -> list:
        if custom_prompt:
            system_message = custom_prompt
        else:
            system_message = (
                "You are an expert AI assistant designed to provide clear, concise, and helpful guidance "
                "on highlighted content. Your responses should always include an 'explanation' field. "
                "Optionally, include 'implementation' for code/technical content and 'example' for concepts "
                "that benefit from illustration. All fields ('explanation', 'implementation', 'example') should be strings. "
                "Use simple terms and analogies. "
                "Respond strictly in JSON format with the keys: 'explanation', 'implementation' (optional), 'example' (optional)."
            )

        user_content_description = f"The user has highlighted the following {content.type.lower()} content:\n\n"
        
        if content.type == "TEXT":
            user_content_description += f"Text: {content.value}"
        elif content.type == "CODE":
            user_content_description += f"Code:\n```\n{content.value}\n```"
        elif content.type == "IMAGE":
            # For image, the 'value' might be a URL or base64.
            # The AI model needs to support multimodal input to interpret this.
            # For text-based models, we might need an image-to-text pre-processor.
            # Assuming Gemini-pro can handle image descriptions or URLs if passed correctly.
            user_content_description += f"Image (description/URL): {content.value}"
        
        user_content_description += "\nPlease provide an explanation, and if applicable, implementation steps and an example."

        return [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_content_description},
        ]

# Global instance for easy access
ai_agent = AIAgent()