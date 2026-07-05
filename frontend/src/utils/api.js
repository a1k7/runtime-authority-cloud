import axios from 'axios';

const API_BASE = '/api';

export const api = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_BASE}/upload`, formData);
    return response.data;
  },
  
  analyze: async (uploadId) => {
    const response = await axios.post(`${API_BASE}/analyze/${uploadId}`);
    return response.data;
  },
  
  getReport: async (uploadId) => {
    const response = await axios.get(`${API_BASE}/report/${uploadId}`);
    return response.data;
  },
  
  getTrace: async (uploadId) => {
    const response = await axios.get(`${API_BASE}/trace/${uploadId}`);
    return response.data;
  },
  
  health: async () => {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
  }
};

export default api;