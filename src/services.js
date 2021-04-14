import axios from 'axios';
const BASE_BACKEND_URL = 'https://brasileirao-bobos.herokuapp.com'

export default {
  login: () => 
    axios.get(`${BASE_BACKEND_URL}/login`),
  getBoloes: () =>
    axios.get(`${BASE_BACKEND_URL}/competicoes/ativas`)
}