import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const getEmbarcaciones= () => api.get('/api/embarcaciones');
export const crearEmbarcacion= (data) => api.post ('/api/embarcaciones', data);
export const eliminarEmbarcacion = (id) => api.delete(`/api/embarcaciones/${id}`);
export const actualizarEmbarcacion = (id, data) => api.put(`/api/embarcaciones/${id}`, data);
export const getEmbarcacionesPorSocio = (idSocio) =>
  api.get(`/api/embarcaciones/socio/${idSocio}`);
export const getEmbarcacionesClub = () =>
  api.get('/api/embarcaciones/club');
