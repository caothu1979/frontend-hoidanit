import axios from "../axios";
const handleLoginApi = async (email, password) => {
    return axios.post("/api/login", { email, password });
}
const getAllUser = (idUser) => {
    return axios.get(`/api/get-all-users?id=${idUser}`);
}
const createNewUserService = (data) => {
    return axios.post('/api/create-users', data);
}
const deleteUser = (idUser) => {
    return axios.delete('/api/delete-users', {
        data: {
            id: idUser
        }
    });
}
const editUser = (data) => {
    return axios.put('/api/edit-users', data);
}

export {
    handleLoginApi, getAllUser, createNewUserService,
    deleteUser, editUser
}