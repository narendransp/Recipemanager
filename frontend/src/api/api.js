import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? "https://recipemanager-4g1t.onrender.com/api"
    : "http://localhost:5000/api"
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default API;

