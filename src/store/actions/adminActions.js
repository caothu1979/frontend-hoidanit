import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
import {
    createNewUserService, getAllUser, deleteUser,
    editUser, getTopDoctorService, getAllDoctorService, saveDetailDoctorService
} from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
// export const FetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const FetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('GENDER');

            if (res && res.errCode === 0) {

                dispatch(FetchGenderSuccess(res.data));

            }
            else {
                dispatch(FetchGenderfaild());
            }

        } catch (e) {
            dispatch(FetchGenderfaild());
            console.log("FetchGenderStart error:", e);
        }

    }
}
export const FetchGenderSuccess = (inPutData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: inPutData,
})
export const FetchGenderfaild = () => ({
    type: actionTypes.FETCH_GENDER_FAILD
})
export const FetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService('POSITION');

            if (res && res.errCode === 0) {

                dispatch(FetchPositionSuccess(res.data));

            }
            else {
                dispatch(FetchPositionFaild());
            }

        } catch (e) {
            dispatch(FetchPositionFaild());
            console.log("FetchGenderStart error:", e);
        }

    }
}
export const FetchPositionSuccess = (inPutData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: inPutData,
})
export const FetchPositionFaild = () => ({
    type: actionTypes.FETCH_POSITION_FAILD
})

export const FetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService('ROLE');

            if (res && res.errCode === 0) {

                dispatch(FetchRoleSuccess(res.data));

            }
            else {
                dispatch(FetchRolefaild());
            }

        } catch (e) {
            dispatch(FetchRolefaild());
            console.log("FetchRoleStart error:", e);
        }

    }
}
export const FetchRoleSuccess = (inPutData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: inPutData,
})
export const FetchRolefaild = () => ({
    type: actionTypes.FETCH_ROLE_FAILD
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log("Check new user Redux:", res);

            if (res && res.errCode === 0) {
                toast.success("Crated is new User Succeed!");
                dispatch(createNewUserSuccess());
                dispatch(FetchAllUserStart());

            }
            else {
                dispatch(createNewUserFailded());
            }

        } catch (e) {
            dispatch(createNewUserFailded());
            console.log("FetchGenderStart error:", e);
        }

    }
}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})
export const createNewUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
});
export const FetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser("ALL");
            console.log("Check new user Redux:", res);

            if (res && res.errCode === 0) {

                dispatch(FetchAllUserSuccess(res.users.reverse()));

            }
            else {
                dispatch(FetchAllUserFailded());
            }

        } catch (e) {
            dispatch(FetchAllUserFailded());
            console.log("FetchGenderStart error:", e);
        }

    }
};

export const FetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data

})
export const FetchAllUserFailded = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILDED
});
export const FetchDeleteUserStart = (idUser) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(idUser);
            console.log("Check new user Redux:", res);
            if (res && res.errCode === 0) {
                toast.success("Deleted is User Succeed!");
                dispatch(FetchDeleteUserSuccess());
                dispatch(FetchAllUserStart());

            }
            else {
                dispatch(FetchDeleteUserFailded());
            }

        } catch (e) {
            dispatch(FetchDeleteUserFailded());
            console.log("FetchGenderStart error:", e);
        }

    }
}
export const FetchDeleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const FetchDeleteUserFailded = () => ({
    type: actionTypes.DELETE_USER_FAILDED,
});

export const FetchEditUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUser(user);
            console.log("Check edit user Redux:", res);
            if (res && res.errCode === 0) {
                toast.success("Update is User Succeed!");
                dispatch(FetchEditUserSuccess());
                dispatch(FetchAllUserStart());

            }
            else {
                dispatch(FetchEditUserFailded());
            }

        } catch (e) {
            dispatch(FetchEditUserFailded());
            console.log("FetchGenderStart error:", e);
        }

    }
}
export const FetchEditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const FetchEditUserFailded = () => ({
    type: actionTypes.EDIT_USER_FAILDED,
});

export const FetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService('');
            console.log("Check Fetch top Doctor Redux:", res);
            if (res && res.errCode === 0) {
                //toast.success("Update is User Succeed!");
                dispatch(FetchTopDoctorSuccess(res.data));
                // dispatch(FetchAllUserStart());

            }
            else {
                dispatch(FetchTopDoctorFailed());
            }

        } catch (e) {
            dispatch(FetchTopDoctorFailed());
            console.log("FetchGenderStart error:", e);
        }

    }
}
export const FetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctor: data,
})
export const FetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});
export const FetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            console.log("Check Fetch All Doctor Redux:", res);
            if (res && res.errCode === 0) {
                //toast.success("Update is User Succeed!");
                dispatch(FetchAllDoctorSuccess(res.data));
                // dispatch(FetchAllUserStart());

            }
            else {
                dispatch(FetchAllDoctorFailed());
            }

        } catch (e) {
            dispatch(FetchAllDoctorFailed());
            console.log("FetchAllDoctorFailed error:", e);
        }

    }
}
export const FetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    dataDt: data,
})
export const FetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
});

export const FetchSaveDetailDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log("check state action:", data.action);
            let res = await saveDetailDoctorService(data);
            console.log("FetchSaveDetailDoctorStart Redux:", res);
            if (res && res.errCode === 0) {
                toast.success("Save Detail Doctor Succeed!");
                dispatch(FetchSaveDetailDoctorSuccess());
                // dispatch(FetchAllUserStart());

            }
            else {
                toast.success("Save information Detail Doctor failed!");
                dispatch(FetchSaveDetailDoctorFailed());
            }

        } catch (e) {
            dispatch(FetchSaveDetailDoctorFailed());
            console.log("FetchAllDoctorFailed error:", e);
        }

    }
}
export const FetchSaveDetailDoctorSuccess = () => ({
    type: actionTypes.FETCH_SAVE_DETAIL_DOCTOR_SUCCESS,

})
export const FetchSaveDetailDoctorFailed = () => ({
    type: actionTypes.FETCH_SAVE_DETAIL_DOCTOR_FAILED,
});
export const FetchAllScheduleTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            console.log("Check Fetch All Time Redux:", res);
            if (res && res.errCode === 0) {
                //toast.success("Update is User Succeed!");
                dispatch(FetchAllScheduleTimeSuccess(res.data));
                // dispatch(FetchAllUserStart());
            }
            else {
                dispatch(FetchAllScheduleTimeFailed());
            }

        } catch (e) {
            dispatch(FetchAllScheduleTimeFailed());
            console.log("FetchAllScheduleTimeFailed error:", e);
        }

    }
}
export const FetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataScheduleTime: data,
})
export const FetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});

export const FetchRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 && 
                resProvince && resProvince.errCode === 0) {
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data
                    };

                dispatch(FetchRequiredDoctorInforSuccess(data));

            }
            else {
                dispatch(FetchRequiredDoctorInforFaild());
            }

        } catch (e) {
            dispatch(FetchRequiredDoctorInforFaild());
            console.log("FetchRequiredDoctorInforFaild error:", e);
        }

    }
}
export const FetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
})
export const FetchRequiredDoctorInforFaild = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILD
})