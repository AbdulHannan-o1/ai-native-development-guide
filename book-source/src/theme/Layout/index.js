import React from 'react';
import Layout from '@theme-original/Layout';
import useHighlight from '@site/src/hooks/useHighlight';
import HighlightPopup from '@site/src/components/HighlightPopup';
import HighlightDialog from '@site/src/components/HighlightDialog';
import aiService from '@site/src/services/aiService'; // Import aiService
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'; // Import useDocusaurusContext

export default function LayoutWrapper(props) {
  console.log("LayoutWrapper: Component rendered.");
  const { siteConfig } = useDocusaurusContext(); // Get siteConfig from context
  const backendApiUrl = siteConfig.customFields.backendApiUrl; // Access backendApiUrl
  console.log("LayoutWrapper: backendApiUrl from Docusaurus context:", backendApiUrl);

  const {
    highlightedContent,
    isPopupVisible,
    showDialog,
    aiResponse,
    loading,
    error,
    handleConfirm: originalHandleConfirm,
    handleCancel,
    handleCloseDialog,
    setAiResponse,
    setLoading,
    setError,
  } = useHighlight();

  const handleConfirm = async (contentToProcess = highlightedContent) => {
    originalHandleConfirm(contentToProcess); // Call original to hide popup and show dialog
    if (!contentToProcess) {
      return;
    }

    try {
      const response = await aiService.getAIResponse(contentToProcess, backendApiUrl); // Pass backendApiUrl
      setAiResponse(response); // This updates the aiResponse
    } catch (err) {
      setError(err); // Pass the full error object
      console.error("Error in LayoutWrapper calling aiService:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Layout {...props} />
      {console.log("LayoutWrapper: isPopupVisible:", isPopupVisible, "showDialog:", showDialog)}
      {isPopupVisible && (
        <HighlightPopup
          content={highlightedContent}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {showDialog && (
        <HighlightDialog
          key={highlightedContent?.value || "default-key"} // Add a key to force re-render
          content={highlightedContent}
          response={loading ? null : aiResponse} // Pass null for response when loading
          loading={loading}
          error={error}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
}
