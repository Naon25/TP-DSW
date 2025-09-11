import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const getAfiliaciones= () => api.get('./api/afiliaciones');
export const crearAfiliacion = async (data) => {
  const resp = await api.post('/api/afiliaciones', data);
  return resp.data;
};
export const eliminarAfiliacion = (id) => api.delete(`./api/afiliaciones/${id}`);
export const actualizarAfiliacion = (id, data) => api.put(`./api/afiliaciones/${id}`, data);