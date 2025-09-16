// Base URL for API requests
const BASE_URL = import.meta.env.VITE_URL || '/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // If unauthorized, clear user session
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page if unauthorized
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Try to parse error message from response
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }
  
  return response.json();
};

// Create a request function with auth token
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    credentials: 'include'
  };
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  forgotPassword: (email) => apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  }),
  
  resetPassword: (token, newPassword) => apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword })
  }),
};

// User APIs
export const userAPI = {
  getProfile: () => apiRequest('/user/profile', {
    method: 'GET'
  }),
  
  updateProfile: (userData) => apiRequest('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(userData)
  }),
};

// Mental health specific APIs
export const mentalHealthAPI = {
  // These would connect to backend endpoints for mental health features
  saveJournal: (entry) => apiRequest('/mental-health/journal', {
    method: 'POST',
    body: JSON.stringify(entry)
  }),
  
  getJournals: () => apiRequest('/mental-health/journal', {
    method: 'GET'
  }),
  
  trackMood: (moodData) => apiRequest('/mental-health/mood', {
    method: 'POST',
    body: JSON.stringify(moodData)
  }),
  
  getMoodHistory: () => apiRequest('/mental-health/mood', {
    method: 'GET'
  }),
};

export default {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, data) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' })
};
