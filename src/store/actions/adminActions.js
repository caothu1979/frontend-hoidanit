import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

// export const FetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const FetchGenderStart = () => {
    return async (dispatch, getState) => {
          try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
          let res = await getAllCodeService('GENDER');
          
          if (res && res.errCode === 0){
            
                    dispatch(FetchGenderSuccess(res.data));
                  
          }
          else {
                    dispatch(FetchGenderfaild());
          }

          } catch(e){
              dispatch(FetchGenderfaild());      
             console.log("FetchGenderStart error:",e);
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
            dispatch({type: actionTypes.FETCH_POSITION_START})
          let res = await getAllCodeService('POSITION');
          
          if (res && res.errCode === 0){
            
                    dispatch(FetchPositionSuccess(res.data));
                  
          }
          else {
                    dispatch(FetchPositionFaild());
          }

          } catch(e){
              dispatch(FetchPositionFaild());      
             console.log("FetchGenderStart error:",e);
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
            dispatch({type: actionTypes.FETCH_ROLE_START})
          let res = await getAllCodeService('ROLE');
          
          if (res && res.errCode === 0){
            
                    dispatch(FetchRoleSuccess(res.data));
                  
          }
          else {
                    dispatch(FetchRolefaild());
          }

          } catch(e){
              dispatch(FetchRolefaild());      
             console.log("FetchRoleStart error:",e);
          }

    }
}
export const FetchRoleSuccess = (inPutData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: inPutData,
})
export const FetchRolefaild = () => ({
    type: actionTypes.FETCH_ROLE_FAILD
})
