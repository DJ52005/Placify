import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// We now specify the '/interview' part here
const INTERVIEW_API_URL = `${API_URL}/interview/`;

// Ask the AI a question
const askQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(INTERVIEW_API_URL + 'ask', questionData, config);
  return response.data;
};

// Get user chat history
const getHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(INTERVIEW_API_URL + 'history', config);
  return response.data;
};

const interviewService = {
  askQuestion,
  getHistory,
};

export default interviewService;
