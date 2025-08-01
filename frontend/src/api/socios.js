import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const getSocios = () => api.get('/socios');
export const crearSocio = (data) => api.post('/socios', data);
