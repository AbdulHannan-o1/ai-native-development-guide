import React from 'react';
import '../styles/HighlightDialog.css'; // Assuming a CSS file for styling

const HighlightDialog = ({ content, response, loading, error, onClose }) => {
  if (!content) return null;

  return (
    <div className="highlight-dialog-overlay">
      <div className="highlight-dialog">
        <div className="highlight-dialog-header">
          <h3>AI Guidance</h3>
          <button onClick={onClose} className="highlight-dialog-close-button">×</button>
        </div>
        <div className="highlight-dialog-content">
          <h4>Highlighted Content:</h4>
          <div className="highlight-dialog-highlighted-content">
            {content.type === 'CODE' ? (
              <pre><code>{content.value}</code></pre>
            ) : (
              <p>{content.value}</p>
            )}
          </div>

          {loading && <p>Loading AI response...</p>}
          {error && (
            <div className="highlight-dialog-error-container">
              <p className="highlight-dialog-error">
                Error: {error.detail?.error || 'Failed to get AI response.'}
              </p>
              {error.detail?.details === "Default API key limit exceeded. Please provide your own API key." && (
                <p className="highlight-dialog-error-suggestion">
                  You've reached the limit for the default API key. Please{' '}
                  <a href="/ai-config" onClick={onClose}>
                    set your own API key
                  </a>{' '}
                  to continue using the AI feature.
                </p>
              )}
            </div>
          )}

          {!loading && response && ( // Only show response if not loading and response exists
            <>
              <h4>Explanation:</h4>
              <p>{response.explanation}</p>

              {response.implementation && (
                <>
                  <h4>Implementation:</h4>
                  <pre><code>{response.implementation}</code></pre>
                </>
              )}

              {response.example && (
                <>
                  <h4>Example:</h4>
                  <pre><code>{response.example}</code></pre>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightDialog;
