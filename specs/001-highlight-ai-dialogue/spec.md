# Feature Specification: Highlight AI Dialogue

**Feature Branch**: `001-highlight-ai-dialogue`  
**Created**: November 16, 2025  
**Status**: Partially Implemented

## User Scenarios & Testing

### User Story 1 - Highlight Content & Get AI Guidance (Priority: P1)

As a user, I want to highlight text or code snippets within the Docusaurus app and receive AI-generated guidance, so that I can quickly understand and apply the information.

**Acceptance Scenarios**:

1.  **Given** a user has selected text content, **When** a confirmation pop-up appears and the user presses Enter, **Then** the AI Dialogue box is displayed, and the "explanation" field is populated with a simple, analogy-based explanation of the selected text.
2.  **Given** a user has selected a code snippet, **When** the user presses `Ctrl+Shift+G`, **Then** the AI Dialogue box is displayed, and the "implementation" field provides step-by-step guidance related to the code snippet.
3.  **Given** a user has selected content that can be explained with examples, **When** the AI Dialogue box is displayed, **Then** the "example" field provides relevant examples.

### User Story 2 - Manage AI API Keys (Priority: P2)

As a user, I want to be able to use a default API key for limited AI requests or configure my own API key for unlimited usage, so that I can control my AI interaction limits and costs.

**Acceptance Scenarios**:

1.  **Given** a user has not configured a custom API key, **When** they use the Highlight AI Dialogue feature, **Then** the default Google Gemini API key is used, and the user is limited to 10 requests.
2.  **Given** a user navigates to the AI config page, **When** they enter a valid custom Google Gemini API key and save it, **Then** the custom API key is stored securely and used for all subsequent AI requests, bypassing the 10-request limit.
3.  **Given** a user has reached the 10-request limit with the default API key, **When** they attempt to use the feature again, **Then** they are notified that the limit has been reached and prompted to configure their own API key.

### User Story 3 - Customize AI Behavior (Priority: P2)

As a user, I want to select a specific AI model and provide a custom prompt on the AI config page, so that I can tailor the AI's responses to my specific needs.

**Acceptance Scenarios**:

1.  **Given** a user navigates to the AI config page, **When** they select a model from a list of available Gemini models, **Then** the selected model is saved and used for future AI requests.
2.  **Given** a user navigates to the AI config page, **When** they enter a custom prompt in the provided text area and save it, **Then** the custom prompt is appended to the system's default instructions for the AI agent.

## Requirements

### Functional Requirements

-   **FR-001**: The system MUST detect user selection of text or code snippets within the Docusaurus app. (*Note: Image highlighting is not yet implemented.*)
-   **FR-002**: The system MUST display a confirmation pop-up immediately after content selection.
-   **FR-003**: The system MUST process user confirmation via the Enter key press or the `Ctrl+Shift+G` keyboard shortcut.
-   **FR-004**: The system MUST display an AI Dialogue box that visually matches the main Docusaurus app theme.
-   **FR-005**: The AI Dialogue box MUST include distinct sections for "Highlighted Content", "Explanation", "Implementation", and "Example".
-   **FR-006**: The system MUST provide an explanation of the selected content in simple terms, utilizing an analogy-based approach where appropriate.
-   **FR-007**: The system MUST provide step-by-step implementation guidance if the selected content is a code snippet or requires implementation details.
-   **FR-008**: The system MUST generate relevant examples if the selected content can be better clarified through illustrative cases.
-   **FR-009**: The system MUST utilize a default Google Gemini API key for AI requests, limited to 10 requests per user.
-   **FR-010**: The system MUST provide an AI configuration page where users can input and save their personal Google Gemini API key, select an AI model, and provide a custom prompt.
-   **FR-011**: The system MUST use the user's configured personal API key for AI requests, overriding the default key and its limitations.
-   **FR-012**: The system MUST notify the user when the default API key's request limit has been reached.
-   **FR-013**: The system MUST handle scenarios where no content is selected, preventing the confirmation pop-up from appearing or providing appropriate feedback.
-   **FR-014**: The system MUST validate user-provided API keys and provide feedback for invalid keys. (*Note: Current implementation is a placeholder.*)
-   **FR-015**: The system MUST gracefully handle cases where the AI service is unavailable or returns an error.
-   **FR-016**: The system MUST ensure that the "Highlighted Content" section accurately displays the user's selected content.
-   **FR-017**: The system MUST allow users to select from a predefined list of Gemini models on the AI config page.
-   **FR-018**: The system MUST use the user-defined custom prompt to augment the default system prompt for the AI agent.

### Key Entities

-   **User**: An individual interacting with the Docusaurus application.
-   **Selected Content**: Any portion of text or a code snippet highlighted by the user.
-   **AI Dialogue Box**: The UI component that displays AI-generated explanations, implementations, and examples.
-   **API Key**: A credential used to authenticate requests to the Google Gemini AI service.
-   **AI Config Page**: A dedicated section where users can manage their AI API key, select a model, and set a custom prompt.

## Implementation Notes
-   **API Key Validation**: The `is_custom_key_valid` function in `api_key_manager.py` is a placeholder and does not perform real validation.
-   **User Identification**: The system currently uses the client's IP address for anonymous users to track API usage. A proper user authentication system is not yet implemented.

## Future Work
-   **Image Highlighting**: Implement support for highlighting and analyzing images.
-   **User Authentication**: Implement a robust user authentication system to securely manage API keys and usage on a per-user basis.
-   **Real API Key Validation**: Implement a proper validation mechanism for custom API keys by making a test call to the Gemini API.

## Success Criteria

-   **SC-001**: 95% of users successfully activate the AI Dialogue feature within 3 seconds of selecting content.
-   **SC-002**: 90% of AI-generated explanations are rated as "clear and helpful" by users.
-   **SC-003**: The AI Dialogue box consistently adheres to the Docusaurus app's visual theme.
-   **SC-004**: Users can successfully configure a custom API key, model, and prompt.
-   **SC-005**: The system accurately enforces the 10-request limit for the default API key.
-   **SC-006**: The `Ctrl+Shift+G` shortcut successfully triggers the AI Dialogue.

## Edge Cases

-   **No Content Selected**: If the user attempts to activate the feature without selecting any content, no pop-up should appear.
-   **Default API Key Limit Reached**: The user should receive a clear notification and a prompt to configure their own API key.
-   **Invalid Custom API Key**: The system should provide immediate feedback indicating the key is invalid.
-   **AI Service Unavailability**: The system should display a user-friendly error message.
-   **Confirmation Cancellation**: If the user cancels the confirmation pop-up (e.g., by pressing Esc), the AI Dialogue should not appear.