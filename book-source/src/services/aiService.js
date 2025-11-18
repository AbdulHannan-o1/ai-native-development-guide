import axios from 'axios';

const aiService = {
  async getAIResponse(content, backendApiUrl) { // Accept backendApiUrl as argument
    const userApiKey = localStorage.getItem('gemini_api_key'); // Read from localStorage

    try {
      const response = await axios.post(`${backendApiUrl}/highlight`, {
        content: content,
        api_key: userApiKey, // Pass the user's API key (or null if not set)
      });
      return response.data;
    } catch (error) {
      console.error('Error calling AI backend:', error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : new Error('Network error or unexpected response');
    }
  },
};

export default aiService;
