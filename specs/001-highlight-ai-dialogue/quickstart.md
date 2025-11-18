# Quickstart Guide: Highlight AI Dialogue Feature

**Feature Branch**: `001-highlight-ai-dialogue`  
**Date**: 2025-11-16  
**Purpose**: Provide a brief guide to quickly set up and run the Highlight AI Dialogue feature.

## 1. Backend Setup (FastAPI)

The backend service is responsible for handling AI requests, interacting with the Google Gemini model via the OpenAI-compatible endpoint, and managing API key usage.

### Prerequisites

*   Python 3.8+
*   `pip` (Python package installer)
*   A Google Gemini API key (for the default key or your custom key)

### Installation

1.  Navigate to the backend directory:
    ```bash
    cd book-source/api/
    ```
2.  Create and activate a virtual environment (recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: .\venv\Scripts\activate
    ```
3.  Install the required Python packages:
    ```bash
    pip install -r requirements.txt # (This file will be created during implementation)
    # Expected packages: fastapi, uvicorn, openai (for OpenAI Agent SDK), python-dotenv
    ```

### Configuration

1.  Create a `.env` file in the `book-source/api/` directory.
2.  Add your default Google Gemini API key to the `.env` file:
    ```
    GEMINI_API_KEY="YOUR_DEFAULT_GEMINI_API_KEY"
    # Optionally, if using an OpenAI-compatible proxy for Gemini:
    # OPENAI_API_BASE="YOUR_OPENAI_COMPATIBLE_GEMINI_ENDPOINT"
    ```

### Running the Backend

1.  Ensure your virtual environment is active.
2.  Start the FastAPI application:
    ```bash
    uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
    ```
    The API will be accessible at `http://localhost:8000`.

## 2. Frontend Integration (Docusaurus)

The frontend components integrate the highlight detection, confirmation pop-up, and AI dialogue box into your Docusaurus site.

### Prerequisites

*   A Docusaurus project (located in `book-source/`)
*   Node.js and npm/yarn

### Installation

1.  Navigate to the Docusaurus project root:
    ```bash
    cd book-source/
    ```
2.  Install any necessary frontend dependencies (these will be defined during implementation, e.g., `react-hotkeys`, `axios`):
    ```bash
    npm install # or yarn install
    ```

### Integration Steps

1.  **Copy Components**: Place `HighlightPopup.jsx` and `HighlightDialog.jsx` into `book-source/src/components/`.
2.  **Copy Hooks**: Place `useHighlight.js` into `book-source/src/hooks/`.
3.  **Copy Services**: Place `aiService.js` into `book-source/src/services/`.
4.  **Root Layout Integration**:
    *   Modify your Docusaurus root layout (e.g., `book-source/src/theme/Layout/index.js` or similar) to include the `HighlightPopup` and `HighlightDialog` components.
    *   Initialize the `useHighlight` hook in your root layout or a top-level component to enable highlight detection and the `Ctrl+Shift+G` shortcut.
    *   Example (conceptual):
        ```jsx
        // book-source/src/theme/Layout/index.js (or similar)
        import React from 'react';
        import Layout from '@theme/Layout';
        import useHighlight from '@site/src/hooks/useHighlight';
        import HighlightPopup from '@site/src/components/HighlightPopup';
        import HighlightDialog from '@site/src/components/HighlightDialog';

        function MyLayout(props) {
          const {
            highlightedContent,
            isPopupVisible,
            showDialog,
            aiResponse,
            loading,
            error,
            handleConfirm,
            handleCancel,
            handleCloseDialog,
            handleShortcutTrigger
          } = useHighlight();

          // Attach shortcut listener globally or to a specific element
          // For example, using a library like 'react-hotkeys' or native event listeners

          return (
            <Layout {...props}>
              {props.children}
              {isPopupVisible && (
                <HighlightPopup
                  content={highlightedContent}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              )}
              {showDialog && (
                <HighlightDialog
                  content={highlightedContent}
                  response={aiResponse}
                  loading={loading}
                  error={error}
                  onClose={handleCloseDialog}
                />
              )}
            </Layout>
          );
        }
        export default MyLayout;
        ```
5.  **Styling**: Ensure the components are styled to match the Docusaurus theme. This might involve importing Docusaurus CSS variables or using custom CSS files.

### Running the Frontend

1.  Navigate to the Docusaurus project root:
    ```bash
    cd book-source/
    ```
2.  Start the Docusaurus development server:
    ```bash
    npm run start # or yarn start
    ```
    Your Docusaurus site will be accessible at `http://localhost:3000`.

## 3. AI Configuration Page

Users can set their own API key to override the default. This page will be a new Docusaurus page or integrated into an existing settings page.

### Implementation

1.  Create a new Docusaurus page (e.g., `book-source/src/pages/ai-config.js`).
2.  This page should include a form for users to input and save their Google Gemini API key.
3.  The saved API key should be stored securely (e.g., in browser local storage, encrypted) and passed with AI requests to the backend.

## Next Steps

After following this quickstart, you should have a functional Highlight AI Dialogue feature integrated into your Docusaurus application. Further development will involve refining the AI agent's behavior, enhancing UI/UX, and implementing robust error handling.