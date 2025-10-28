import axios from 'axios';

const API_URL = 'http://localhost:3000/api/boxes';

export const getBoxes = () => {
  return axios.get(API_URL);
};

export const crearBox = (boxData) => {
  return axios.post(API_URL, boxData);
};

export const eliminarBox = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const actualizarBox = (id, boxData) => {
  return axios.put(`${API_URL}/${id}`, boxData);
};