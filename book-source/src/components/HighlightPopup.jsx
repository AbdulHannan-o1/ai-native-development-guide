import React from 'react';
import '../styles/HighlightPopup.css'; // Assuming a CSS file for styling

const HighlightPopup = ({ content, onConfirm, onCancel }) => {
  if (!content) return null;

  // Basic positioning logic. In a real app, this would be more sophisticated
  // to position near the selection or cursor.
  const style = {
    position: 'absolute',
    top: '50%', // Placeholder
    left: '50%', // Placeholder
    transform: 'translate(-50%, -50%)', // Center it for now
    zIndex: 10000,
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onConfirm();
    } else if (event.key === 'Escape') {
      onCancel();
    }
  };

  // Attach keydown listener when popup is visible
  React.useEffect(() => {
    if (content) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [content, onConfirm, onCancel]);

  return (
    <div className="highlight-popup" style={style}>
      <p>Analyze "{content.value.substring(0, 50)}..."?</p>
      <div className="highlight-popup-actions">
        <button onClick={onConfirm}>Enter to Confirm</button>
        <button onClick={onCancel}>Esc to Cancel</button>
      </div>
    </div>
  );
};

export default HighlightPopup;
