import React, { useState } from 'react';
import Layout from '@theme/Layout';

function AIConfigPage() {
  const [apiKey, setApiKey] = useState('');

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    alert('API Key saved!');
  };

  return (
    <Layout title="AI Configuration">
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1>AI Configuration</h1>
            <p>
              Please enter your Gemini API key below. This key will be stored in
              your browser's local storage and will be used to power the AI
              features of this site.
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
            <button className="button button--primary" onClick={saveApiKey}>
              Save API Key
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AIConfigPage;
