import axios from 'axios';

const api = axios.create({
  baseURL: 'http://startse-dev.herokuapp.com/'
})

export default api;
