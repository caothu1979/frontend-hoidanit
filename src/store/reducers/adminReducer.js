import actionTypes from '../actions/actionTypes';


const initialState = {
    isLoadingGender: false,
    genders: [],
    role: [],
    position: [],
    users: [],
    topDoctor: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = true;
            console.log('Fetch gender start:', action);
            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            console.log('Fetch gender success:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILD:
            state.genders = [];
            state.isLoadingGender = false;
            console.log('Fetch gender success:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_START:
            let copyState1 = { ...state };
            copyState1.position = action.data;
            console.log('Fetch position start:', action);
            return {
                ...copyState1,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data;
            console.log('Fetch position success:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILD:
            state.position = [];
            console.log('Fetch position faild:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_START:
            let copyState2 = { ...state };
            copyState2.role = action.data;
            console.log('Fetch role start:', action);
            return {
                ...copyState2,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.role = action.data;
            console.log('Fetch Role success:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILD:
            state.role = [];
            console.log('Fetch Role faild:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            console.log('Fetch Role faild:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USER_FAILDED:
            state.users = [];
            console.log('Fetch Role faild:', action);
            return {
                ...state,

            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.dataDoctor;
            console.log('Fetch Role faild:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
            state.topDoctor = [];
            console.log('Fetch Role faild:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDt;
            console.log('FETCH_ALL_DOCTOR_SUCCESS:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            console.log('Fetch Role faild:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataScheduleTime;
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            console.log('Fetch Role faild:', action);
            return {
                ...state,

            }
            // action doctor information
            // case actionTypes.FETCH_DOCTOR_PRICE_START:
            // let copyState = { ...state };
            // copyState.genders = action.data;
            // copyState.isLoadingGender = true;
            // console.log('Fetch gender start:', action);
            // return {
            //     ...copyState,

            // }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredInfor = action.data;
            
            console.log('FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:', action);
            return {
                ...state,

            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILD:
            state.gendersallRequiredInfor = [];
            
            console.log('FETCH_REQUIRED_DOCTOR_INFOR_FAILD:', action);
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;