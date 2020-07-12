import axios from 'axios';

const api = axios.create({
  baseURL: 'https://startse-dev.herokuapp.com/'
})

export default api;
