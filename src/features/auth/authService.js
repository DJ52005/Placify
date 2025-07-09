import axios from 'axios';

// Get the base URL from the Vercel environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API_URL_USERS = `${API_BASE_URL}/api/users/`;

// Register user
const register = async (userData) => {
  // POST to https://.../api/users/
  const response = await axios.post(API_URL_USERS, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  // POST to https://.../api/users/login
  const response = await axios.post(API_URL_USERS + 'login', userData);
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
// This code is part of the authentication service for a web application.
// It handles user registration, login, and logout functionalities.