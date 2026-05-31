import axios from "axios";

// URL base para el backend
const baseUrl =
  "http://localhost:3001/persons"; /* Change this to your actual backend URL */

// Funciones para interactuar con el backend
// Obtener todos los contactos
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Agregar un nuevo contacto
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

// Actualizar un contacto existente
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
