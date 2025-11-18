# Data Model: Highlight AI Dialogue Feature

**Feature Branch**: `001-highlight-ai-dialogue`  
**Date**: 2025-11-16  
**Purpose**: Define the key entities and their attributes for the Highlight AI Dialogue feature, based on the feature specification and implementation plan.

## Entities

### 1. User

Represents an individual interacting with the Docusaurus application and the AI dialogue feature.

*   **`id`**:
    *   **Type**: String (Unique Identifier)
    *   **Description**: A unique identifier for the user. This could be a session ID, a user ID from an authentication system, or a simple client-side generated ID for anonymous users.
    *   **Validation**: Required.
*   **`default_api_key_requests_count`**:
    *   **Type**: Integer
    *   **Description**: Tracks the number of AI requests made by the user using the default system-provided API key. Resets periodically (e.g., daily) or upon session expiry.
    *   **Validation**: Non-negative. Max value 10.
*   **`custom_api_key`**:
    *   **Type**: String (Encrypted/Hashed)
    *   **Description**: Stores the user's personal Google Gemini API key, if provided. Should be stored securely (encrypted or hashed).
    *   **Validation**: Optional. If present, must be a valid API key format.

### 2. Highlighted Content

Represents the content selected by the user in the Docusaurus application.

*   **`type`**:
    *   **Type**: Enum (`TEXT`, `CODE`, `IMAGE`)
    *   **Description**: Specifies the type of content that has been highlighted.
    *   **Validation**: Required. Must be one of the defined enum values.
*   **`value`**:
    *   **Type**: String (for `TEXT`/`CODE`), URL/Base64 String (for `IMAGE`)
    *   **Description**: The actual content that was highlighted. For text and code, this is the string value. For images, it could be a URL to the image or a Base64 encoded string of the image data.
    *   **Validation**: Required. Must not be empty. Max length constraints may apply depending on the content type.

### 3. AI Request

Represents the data sent from the frontend to the backend AI service.

*   **`content`**:
    *   **Type**: Object (referencing `Highlighted Content` entity)
    *   **Description**: The highlighted content object.
    *   **Validation**: Required.
*   **`api_key`**:
    *   **Type**: String or Null
    *   **Description**: The user's custom API key if provided, otherwise `null` to indicate use of the default key.
    *   **Validation**: Optional. If provided, must be a valid API key format.

### 4. AI Response

Represents the structured guidance returned by the AI agent.

*   **`explanation`**:
    *   **Type**: String
    *   **Description**: A simple, analogy-based explanation of the highlighted content. Always required.
    *   **Validation**: Required. Must not be empty.
*   **`implementation`**:
    *   **Type**: String or Null
    *   **Description**: Step-by-step guidance for implementing concepts related to the highlighted content (e.g., for code snippets). Optional.
    *   **Validation**: Optional.
*   **`example`**:
    *   **Type**: String or Null
    *   **Description**: Illustrative examples to clarify the highlighted content. Optional.
    *   **Validation**: Optional.

### 5. API Key (Conceptual)

Represents the credentials used to authenticate with the Google Gemini AI service. This is a conceptual entity as its storage and management are handled by the system.

*   **`value`**:
    *   **Type**: String
    *   **Description**: The actual API key string.
*   **`type`**:
    *   **Type**: Enum (`DEFAULT`, `CUSTOM`)
    *   **Description**: Indicates whether the key is the system-provided default or a user-provided custom key.
*   **`limit`**:
    *   **Type**: Integer
    *   **Description**: The request limit associated with the API key (e.g., 10 for default, unlimited for custom).

## Relationships

*   A `User` can have one `custom_api_key`.
*   A `User` makes multiple `AI Requests`.
*   Each `AI Request` contains `Highlighted Content`.
*   Each `AI Request` results in an `AI Response`.

## State Transitions (for User's default_api_key_requests_count)

*   **Initial State**: `default_api_key_requests_count = 0`
*   **Transition**: On each successful `AI Request` using the default key, `default_api_key_requests_count` increments by 1.
*   **Limit Reached**: When `default_api_key_requests_count` reaches 10, subsequent requests using the default key are rejected.
*   **Reset**: `default_api_key_requests_count` resets to 0 after a defined period (e.g., 24 hours) or upon session invalidation.