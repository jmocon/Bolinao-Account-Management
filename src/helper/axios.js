import axios from 'helper/axios';

const instance = axios.create({
  baseURL: 'http://localhost/whjewels_api/'
});

export default instance;
