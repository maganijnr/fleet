import {
   AUTH_USER_REQUEST,
   AUTH_USER_SUCCESS,
   AUTH_USER_FAIL,
   GET_USER_REQUEST,
   GET_USER_SUCCESS,
   GET_USER_FAIL
} from '../types'

export const userLoginReducer = (state={ user:{}, redirect: false },action) => {
   switch(action.type){
      case AUTH_USER_REQUEST:
         return { loading: true, user:{} }
      case  AUTH_USER_SUCCESS:
         return {loading:false, user:action.payload, redirect: !state.redirect}
      case AUTH_USER_FAIL:
         return { loading:false, error:action.payload}
      default:
         return state
   }
}

export const userInfoReducer = (state={ userInfo:{}}, action) => {
   switch(action.type){
      case GET_USER_REQUEST:
         return { loading: true, userInfo:{} }
      case  GET_USER_SUCCESS:
         return {loading:false, userInfo:action.payload}
      case GET_USER_FAIL:
         return { loading:false, error:action.payload}
      default:
         return state
   }
}