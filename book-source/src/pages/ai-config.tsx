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
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(GEMINI_MODELS[0]);
  const [customPrompt, setCustomPrompt] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    const savedModel = localStorage.getItem('gemini_model');
    if (savedModel && GEMINI_MODELS.includes(savedModel)) {
      setModel(savedModel);
    }
    const savedCustomPrompt = localStorage.getItem('gemini_custom_prompt');
    if (savedCustomPrompt) {
      setCustomPrompt(savedCustomPrompt);
    }
  }, []);

  const saveConfig = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    localStorage.setItem('gemini_model', model);
    localStorage.setItem('gemini_custom_prompt', customPrompt);
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
            <div className="margin-bottom--lg">
              <label htmlFor="customPromptInput">Custom Prompt (Optional)</label>
              <textarea
                id="customPromptInput"
                className="input"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                style={{ width: '100%', minHeight: '100px' }}
                placeholder="Enter your custom prompt here. This will be appended to the default agent instruction."
              />
              <p className="text--small text--italic">
                If provided, this prompt will be added to the agent's default instruction.
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