import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://javalaunchpad.herokuapp.com',
  headers: {
    'Authorization': 'Bearer token'
  }
});

export default instance;
