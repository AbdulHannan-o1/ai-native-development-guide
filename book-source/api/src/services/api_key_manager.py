from datetime import datetime, timedelta
from typing import Dict, Any, Optional

class APIKeyManager:
    def __init__(self, default_limit: int = 10, reset_interval_hours: int = 24):
        self.default_limit = default_limit
        self.reset_interval = timedelta(hours=reset_interval_hours)
        self.user_usage: Dict[str, Dict[str, Any]] = {} # {user_id: {"count": int, "last_reset": datetime}}

    def _get_user_id(self, api_key: Optional[str]) -> str:
        # For default key usage, we need a way to identify the user.
        # In a real application, this would come from authentication (e.g., session ID, JWT).
        # For now, we'll use a placeholder or assume a simple client-side ID.
        # For this implementation, we'll assume a 'user_id' is passed implicitly or explicitly.
        # For the purpose of this foundational task, we'll use a generic ID if no custom key is provided.
        return "anonymous_user" if api_key is None else f"custom_key_user_{hash(api_key)}"

    def check_and_increment_usage(self, user_id: str) -> bool:
        """
        Checks if the user has exceeded the default API key limit and increments usage.
        Returns True if allowed, False if limit exceeded.
        """
        if user_id not in self.user_usage:
            self.user_usage[user_id] = {"count": 0, "last_reset": datetime.now()}

        user_data = self.user_usage[user_id]

        # Check if reset interval has passed
        if datetime.now() - user_data["last_reset"] > self.reset_interval:
            user_data["count"] = 0
            user_data["last_reset"] = datetime.now()

        if user_data["count"] < self.default_limit:
            user_data["count"] += 1
            return True
        else:
            return False

    def get_remaining_requests(self, user_id: str) -> int:
        """
        Returns the number of remaining requests for a user with the default key.
        """
        if user_id not in self.user_usage:
            return self.default_limit

        user_data = self.user_usage[user_id]
        if datetime.now() - user_data["last_reset"] > self.reset_interval:
            return self.default_limit
        
        return self.default_limit - user_data["count"]

    def is_custom_key_valid(self, api_key: str) -> bool:
        """
        Placeholder for actual API key validation.
        In a real scenario, this would involve calling the Gemini API to validate the key.
        For now, we'll just check if it's not empty.
        """
        return bool(api_key)

# Global instance for easy access
api_key_manager = APIKeyManager()
