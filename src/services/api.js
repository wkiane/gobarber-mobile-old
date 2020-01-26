import axios from 'axios';

const api = axios.create({
  baseURL: '172.17.0.1:3333',
});

export default api;
