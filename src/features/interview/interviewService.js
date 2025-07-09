import axios from 'axios';

// Get the base URL from the Vercel environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API_URL_INTERVIEW = `${API_BASE_URL}/api/interview/`;

// Ask the AI a question
const askQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // POST to https://.../api/interview/ask
  const response = await axios.post(API_URL_INTERVIEW + 'ask', questionData, config);

  return response.data;
};

// Get user chat history
const getHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // GET from https://.../api/interview/history
  const response = await axios.get(API_URL_INTERVIEW + 'history', config);

  return response.data;
};

const interviewService = {
  askQuestion,
  getHistory,
};

export default interviewService;
// This code is part of the interview service for a web application.
// It handles interactions with an AI model for asking questions and retrieving chat history.