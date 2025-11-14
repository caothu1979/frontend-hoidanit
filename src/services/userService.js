import axios from "../axios";
const handleLoginApi = async (email, password) => {
    return axios.post("/api/login", { email, password });
}
const getAllUser = (idUser) => {
    return axios.get(`/api/get-all-users?id=${idUser}`);
}
export {
    handleLoginApi, getAllUser
}