import axios from 'axios';

// This uses the Vercel environment variable in production,
// but falls back to localhost for local development.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// We now specify the '/users' part here to build the correct path
const USER_API_URL = `${API_URL}/users/`;

// Register user
const register = async (userData) => {
  // POST request to /api/users/
  const response = await axios.post(USER_API_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  // POST request to /api/users/login
  const response = await axios.post(USER_API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
