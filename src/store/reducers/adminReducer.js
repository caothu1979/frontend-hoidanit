import actionTypes from '../actions/actionTypes';


const initialState = {
    isLoadingGender: false,
    genders: [],
    role: [],
    position: [],
    users:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.genders = action.data;
            copyState.isLoadingGender = true;
            console.log('Fetch gender start:',action);
            return {
                ...copyState,
                
            }
             case actionTypes.FETCH_GENDER_SUCCESS:
                state.genders = action.data;
                state.isLoadingGender = false;
                console.log('Fetch gender success:',action);
            return {
                ...state,
                
            }
             case actionTypes.FETCH_GENDER_FAILD:
                state.genders = [];
                state.isLoadingGender = false;
                console.log('Fetch gender success:',action);
            return {
                ...state,
                
            }
       case actionTypes.FETCH_POSITION_START:
            let copyState1 = {...state};
            copyState1.position = action.data;
            console.log('Fetch position start:',action);
            return {
                ...copyState1,
                
            }
             case actionTypes.FETCH_POSITION_SUCCESS:
                state.position = action.data;
                console.log('Fetch position success:',action);
            return {
                ...state,
                
            }
             case actionTypes.FETCH_POSITION_FAILD:
                state.position = [];
                console.log('Fetch position faild:',action);
            return {
                ...state,
                
            }
       case actionTypes.FETCH_ROLE_START:
            let copyState2 = {...state};
            copyState2.role = action.data;
            console.log('Fetch role start:',action);
            return {
                ...copyState2,
                
            }
             case actionTypes.FETCH_ROLE_SUCCESS:
                state.role = action.data;
                console.log('Fetch Role success:',action);
            return {
                ...state,
                
            }
             case actionTypes.FETCH_ROLE_FAILD:
                state.role = [];
                console.log('Fetch Role faild:',action);
            return {
                ...state,
                
            }
            case actionTypes.FETCH_ALL_USER_SUCCESS:
                state.users = action.users;
                console.log('Fetch Role faild:',action);
            return {
                ...state,
                
            }
            case actionTypes.FETCH_ALL_USER_FAILDED:
                state.users = [];
                console.log('Fetch Role faild:',action);
            return {
                ...state,
                
            }
       
        default:
            return state;
    }
}

export default adminReducer;