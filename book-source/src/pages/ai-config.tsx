import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

const GEMINI_MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  // Add other models here when available
];

function AIConfigPage() {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(GEMINI_MODELS[0]);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    const savedModel = localStorage.getItem('gemini_model');
    if (savedModel && GEMINI_MODELS.includes(savedModel)) {
      setModel(savedModel);
    }
  }, []);

  const saveConfig = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    localStorage.setItem('gemini_model', model);
    alert('Configuration saved!');
  };

  return (
    <Layout title="AI Configuration">
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1>AI Configuration</h1>
            <p>
              Configure your Gemini API key and select your preferred model. This
              configuration will be stored in your browser's local storage.
            </p>
            <div className="margin-bottom--lg">
              <label htmlFor="apiKeyInput">Gemini API Key</label>
              <input
                id="apiKeyInput"
                type="text"
                className="input"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div className="margin-bottom--lg">
              <label htmlFor="modelSelect">Gemini Model</label>
              <select
                id="modelSelect"
                className="input"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{ width: '100%' }}
              >
                {GEMINI_MODELS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <p>
                Note: This is a placeholder list of models. Please provide the
                full list of models you would like to include.
              </p>
            </div>
            <button className="button button--primary" onClick={saveConfig}>
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AIConfigPage;
