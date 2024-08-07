import base from "./base.js";

const endpoint = "profesor_listar_asesorias/";

const findOne = async (id) => await base.post(`${endpoint}/${id}`);

const findAll = async (payload) => await base.post(endpoint, payload);

const update = async (payload) => await base.put(endpoint, payload);

const remove = async (id) => await base.remove(`${endpoint}/${id}`);

const api = { findAll, findOne, update, remove };

export default api;
