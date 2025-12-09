import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
import { createNewUserService, getAllUser, deleteUser, editUser, getTopDoctorService } from '../../services/userService';
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
            console.log("Check edit user Redux:", res);
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

