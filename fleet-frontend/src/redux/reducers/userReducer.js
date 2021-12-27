import {
   AUTH_USER_REQUEST,
   AUTH_USER_SUCCESS,
   AUTH_USER_FAIL
} from '../types'

export const userLoginReducer = (state={ user:{} },action) => {
   switch(action.type){
      case AUTH_USER_REQUEST:
         return { loading: true, user:{} }
      case  AUTH_USER_SUCCESS:
         return {loading:false, user:action.payload}
      case AUTH_USER_FAIL:
         return { loading:false, error:action.payload}
      default:
         return state
   }
}