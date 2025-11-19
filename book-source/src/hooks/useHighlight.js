import { useState, useEffect, useCallback } from 'react';

const useHighlight = () => {
  const [highlightedContent, setHighlightedContent] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();

      if (selectedText.length > 0) {
        return { type: 'TEXT', value: selectedText };
      }
    }
    return null;
  }, []);

  const handleSelectionChange = useCallback(() => {
    const content = getSelection();
    if (content) {
      setHighlightedContent(content);
      setIsPopupVisible(true);
    } else {
      setIsPopupVisible(false);
      setHighlightedContent(null);
    }
  }, [getSelection]);

  const handleConfirm = useCallback((contentToProcess = highlightedContent) => {
    setIsPopupVisible(false);
    if (!contentToProcess) {
      return;
    }

    setLoading(true);
    setError(null);
    setAiResponse(null); // Reset AI response for new request
    setShowDialog(true); // Show dialog immediately upon confirmation
  }, [highlightedContent]); // handleConfirm depends on highlightedContent

  const handleShortcut = useCallback((event) => {
    // Ctrl+Shift+G
    if (event.ctrlKey && event.shiftKey && event.key === 'G') {
      event.preventDefault();
      const content = getSelection();
      if (content) {
        setHighlightedContent(content);
        handleConfirm(content); // handleConfirm is called here
      }
    }
  }, [getSelection, handleConfirm]); // handleConfirm is a dependency here

  const handleCancel = useCallback(() => {
    setIsPopupVisible(false);
    setHighlightedContent(null);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
    setAiResponse(null);
    setHighlightedContent(null);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [handleSelectionChange, handleShortcut]);

  return {
    highlightedContent,
    isPopupVisible,
    showDialog,
    aiResponse,
    loading,
    error,
    handleConfirm,
    handleCancel,
    handleCloseDialog,
    setAiResponse,
    setLoading,
    setError,
  };
};

export default useHighlight;

