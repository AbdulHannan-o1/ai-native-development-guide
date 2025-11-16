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
          {error && <p className="highlight-dialog-error">Error: {error}</p>}

          {response && (
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
