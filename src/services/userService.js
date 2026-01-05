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
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}
const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}
const getAllDoctorService = () => {
    return axios.get('/api/get-all-doctors');
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/post-infor-doctor', data);
}
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}
const postBulkCreateScheduleService = (data) => {
    return axios.post('/api/bulk-create-schedule-doctor', data);
}
const getScheduleDoctorByDate = (doctorId,date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}


export {
    handleLoginApi, getAllUser, createNewUserService,
    deleteUser, editUser, getAllCodeService, getTopDoctorService,
    getAllDoctorService, saveDetailDoctorService, getDetailInforDoctor,
    postBulkCreateScheduleService, getScheduleDoctorByDate

}