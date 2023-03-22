import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.248.20:6090/',
});

export default api;
