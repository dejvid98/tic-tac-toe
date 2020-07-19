import axios from 'axios';

// Helper function that fixes docker CORS error for HTTP requests
const httpRequest = axios.create({
  baseURL: 'http://178.128.206.150:7000',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default httpRequest;
