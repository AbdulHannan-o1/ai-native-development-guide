import { useState, useEffect, useCallback } from 'react';

const useHighlight = () => {
  console.log("useHighlight: Hook initialized.");
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
        console.log("useHighlight: Content selected:", selectedText.substring(0, 50) + "...");
        return { type: 'TEXT', value: selectedText };
      }
    }
    console.log("useHighlight: No content selected.");
    return null;
  }, []);

  const handleSelectionChange = useCallback(() => {
    console.log("useHighlight: Mouseup event detected.");
    const content = getSelection();
    if (content) {
      setHighlightedContent(content);
      setIsPopupVisible(true);
      console.log("useHighlight: Popup set to visible.");
    } else {
      setIsPopupVisible(false);
      setHighlightedContent(null);
      console.log("useHighlight: Popup set to hidden (no content).");
    }
  }, [getSelection]);

  const handleConfirm = useCallback((contentToProcess = highlightedContent) => {
    console.log("useHighlight: handleConfirm called.");
    setIsPopupVisible(false);
    if (!contentToProcess) {
      console.log("useHighlight: handleConfirm - No content to process.");
      return;
    }

    setLoading(true);
    setError(null);
    setAiResponse(null); // Reset AI response for new request
    setShowDialog(true); // Show dialog immediately upon confirmation
    console.log("useHighlight: Dialog set to visible, loading started.");
  }, [highlightedContent]); // handleConfirm depends on highlightedContent

  const handleShortcut = useCallback((event) => {
    console.log("useHighlight: Keydown event detected.");
    // Ctrl+Shift+G
    if (event.ctrlKey && event.shiftKey && event.key === 'G') {
      event.preventDefault();
      console.log("useHighlight: Ctrl+Shift+G shortcut detected.");
      const content = getSelection();
      if (content) {
        setHighlightedContent(content);
        handleConfirm(content); // handleConfirm is called here
        console.log("useHighlight: Shortcut confirmed, dialog should show.");
      } else {
        console.log("useHighlight: Shortcut pressed but no content selected.");
      }
    }
  }, [getSelection, handleConfirm]); // handleConfirm is a dependency here

  const handleCancel = useCallback(() => {
    console.log("useHighlight: handleCancel called.");
    setIsPopupVisible(false);
    setHighlightedContent(null);
  }, []);

  const handleCloseDialog = useCallback(() => {
    console.log("useHighlight: handleCloseDialog called.");
    setShowDialog(false);
    setAiResponse(null);
    setHighlightedContent(null);
  }, []);

  useEffect(() => {
    console.log("useHighlight: Attaching event listeners.");
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keydown', handleShortcut);
    return () => {
      console.log("useHighlight: Removing event listeners.");
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
