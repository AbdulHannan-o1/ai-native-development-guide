import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

const AiConfigPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load saved API key from local storage
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setMessage('API Key saved successfully!');
    } else {
      localStorage.removeItem('gemini_api_key');
      setMessage('API Key cleared.');
    }
  };

  return (
    <Layout title="AI Configuration" description="Configure your AI API key">
      <main className="container margin-vert--lg">
        <h1>AI Configuration</h1>
        <p>
          Here you can set your personal Google Gemini API key to bypass the default 10-request limit.
        </p>
        <div className="card">
          <div className="card__header">
            <h3>Your Gemini API Key</h3>
          </div>
          <div className="card__body">
            <input
              type="text"
              className="input input--lg"
              placeholder="Enter your Gemini API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <button className="button button--primary" onClick={handleSave}>
              Save API Key
            </button>
            {message && <p className="margin-top--md">{message}</p>}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AiConfigPage;
