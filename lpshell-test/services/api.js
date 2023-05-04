import axios from 'axios';

const apiStart = axios.create({
  startURL: 'http://192.168.248.20:6090/',
});
const apiBase = axios.create({
  baseURL: 'http://192.168.248.20:8090/',
});
const apiClient = axios.create({
  clientURL: 'http://192.168.248.20:7090/',
});

export default {apiStart, apiBase, apiClient };
