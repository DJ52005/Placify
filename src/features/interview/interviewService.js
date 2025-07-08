import axios from 'axios';

const API_URL = 'http://localhost:5000/api/interview/';

// Ask the AI a question
const askQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'ask', questionData, config);

  return response.data;
};

// Get user chat history
const getHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'history', config);

  return response.data;
};

const interviewService = {
  askQuestion,
  getHistory, // <-- We added the new function here
};

export default interviewService;
