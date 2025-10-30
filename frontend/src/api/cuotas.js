import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const getCuotas= () => api.get('/api/cuotasMensuales');
export const crearCuota = (data) => api.post ('/api/cuotasMensuales', data);
export const eliminarCuota = (id) => api.delete(`/api/cuotasMensuales/${id}`);
export const actualizarCuota = (id, data) => api.put(`/api/cuotasMensuales/${id}`, data);
export const getCuotasPorSocio = (idSocio) =>
  api.get(`/api/cuotasMensuales/socio/${idSocio}`);

