import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

const GEMINI_MODELS = [
  'gemini-3-pro-preview',
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash-image',
  'gemini-2.0-flash',
  // Add other models here when available
];

function AIConfigPage() {
  console.log('AIConfigPage: Component rendering...');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(GEMINI_MODELS[0]);
  console.log('AIConfigPage: Initial state - apiKey:', apiKey, 'model:', model);

  useEffect(() => {
    console.log('AIConfigPage: useEffect running...');
    const savedApiKey = localStorage.getItem('gemini_api_key');
    console.log('AIConfigPage: Fetched savedApiKey from localStorage:', savedApiKey);
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    const savedModel = localStorage.getItem('gemini_model');
    console.log('AIConfigPage: Fetched savedModel from localStorage:', savedModel);
    if (savedModel && GEMINI_MODELS.includes(savedModel)) {
      setModel(savedModel);
    }
  }, []);

  const saveConfig = () => {
    console.log('AIConfigPage: saveConfig called. Saving apiKey:', apiKey, 'model:', model);
    localStorage.setItem('gemini_api_key', apiKey);
    localStorage.setItem('gemini_model', model);
    alert('Configuration saved!');
  };

  console.log('AIConfigPage: Rendering JSX. Current model state:', model);
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