import axios from 'axios';

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor - Add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if needed
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Attendees API functions
export const attendeesAPI = {
  // Get all attendees by year and type
  getAttendees: async (year, type = null) => {
    try {
      const params = { year };
      if (type) params.type = type;
      const response = await api.get('/attendees', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching attendees:', error);
      throw error;
    }
  },

  // Get attendees by type (general, research, creative)
  getAttendeesByType: async (year, type) => {
    try {
      const response = await api.get(`/attendees/${type}`, { params: { year } });
      return response.data; // Backend returns { success: true, data: [...], count: number }
    } catch (error) {
      console.error(`Error fetching ${type} attendees:`, error);
      throw error;
    }
  },

  // Get attendee by ID
  getAttendeeById: async (id) => {
    try {
      const response = await api.get(`/attendees/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendee:', error);
      throw error;
    }
  },



  // Export attendees data
  exportAttendees: async (year, type = null) => {
    try {
      const params = { year };
      if (type) params.type = type;
      const response = await api.get('/attendees/export', { 
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting attendees:', error);
      throw error;
    }
  },

  // Get attendees statistics
  getAttendeesStats: async (year) => {
    try {
      const response = await api.get('/attendees/stats', { params: { year } });
      return response.data.data; // Return the data property from backend response
    } catch (error) {
      console.error('Error fetching attendees stats:', error);
      throw error;
    }
  },

  // Search attendees
  searchAttendees: async (year, searchTerm, filters = {}) => {
    try {
      const params = { year, search: searchTerm, ...filters };
      const response = await api.get('/attendees/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching attendees:', error);
      throw error;
    }
  }
};

// Exhibitions API functions
export const exhibitionsAPI = {
  // Get all exhibitions
  getExhibitions: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.category_id) params.append('category_id', filters.category_id);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/exhibitions?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
      throw error;
    }
  },

  // Get single exhibition by ID
  getExhibition: async (id) => {
    try {
      const response = await api.get(`/exhibitions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching exhibition:', error);
      throw error;
    }
  },

  // Create new exhibition
  createExhibition: async (exhibitionData) => {
    try {
      const response = await api.post('/exhibitions', exhibitionData);
      return response.data;
    } catch (error) {
      console.error('Error creating exhibition:', error);
      throw error;
    }
  },

  // Update exhibition
  updateExhibition: async (id, exhibitionData) => {
    try {
      const response = await api.put(`/exhibitions/${id}`, exhibitionData);
      return response.data;
    } catch (error) {
      console.error('Error updating exhibition:', error);
      throw error;
    }
  },

  // Delete exhibition
  deleteExhibition: async (id) => {
    try {
      const response = await api.delete(`/exhibitions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting exhibition:', error);
      throw error;
    }
  },

  // Get exhibition categories
  getCategories: async () => {
    try {
      const response = await api.get('/exhibitions/categories/list');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Upload file
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Upload multiple files
  uploadMultipleFiles: async (files) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const response = await api.post('/upload/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  },

  // Delete file from S3
  deleteFile: async (fileKey) => {
    try {
      const response = await api.delete(`/upload/delete?key=${encodeURIComponent(fileKey)}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};

export default api; 