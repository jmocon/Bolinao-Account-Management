import axios from 'axios';

const instance = axios.create({
  baseURL: `http://${window.location.hostname}:3001/`
});

export default instance;
