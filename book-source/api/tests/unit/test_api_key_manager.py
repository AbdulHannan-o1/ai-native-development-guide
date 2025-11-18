import pytest
from datetime import datetime, timedelta
from book_source.api.src.services.api_key_manager import APIKeyManager

@pytest.fixture
def api_key_manager_instance():
    # Use a short reset interval for easier testing
    return APIKeyManager(default_limit=3, reset_interval_hours=0.01) # 36 seconds

def test_initial_usage(api_key_manager_instance):
    user_id = "test_user_1"
    assert api_key_manager_instance.check_and_increment_usage(user_id) is True
    assert api_key_manager_instance.get_remaining_requests(user_id) == 2

def test_limit_exceeded(api_key_manager_instance):
    user_id = "test_user_2"
    # Use up all requests
    api_key_manager_instance.check_and_increment_usage(user_id)
    api_key_manager_instance.check_and_increment_usage(user_id)
    api_key_manager_instance.check_and_increment_usage(user_id)
    
    assert api_key_manager_instance.get_remaining_requests(user_id) == 0
    assert api_key_manager_instance.check_and_increment_usage(user_id) is False

def test_reset_interval(api_key_manager_instance):
    user_id = "test_user_3"
    api_key_manager_instance.check_and_increment_usage(user_id)
    assert api_key_manager_instance.get_remaining_requests(user_id) == 2

    # Manually advance time for testing reset
    api_key_manager_instance.user_usage[user_id]["last_reset"] = datetime.now() - timedelta(hours=1)
    
    # First request after reset interval should reset count and allow usage
    assert api_key_manager_instance.check_and_increment_usage(user_id) is True
    assert api_key_manager_instance.get_remaining_requests(user_id) == 2

def test_is_custom_key_valid():
    manager = APIKeyManager()
    assert manager.is_custom_key_valid("valid_key_123") is True
    assert manager.is_custom_key_valid("") is False
    assert manager.is_custom_key_valid(None) is False # type: ignore
