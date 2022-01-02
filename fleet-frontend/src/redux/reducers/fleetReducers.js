import {
   SEARCH_FLEET_REQUEST,
   SEARCH_FLEET_SUCCESS,
   SEARCH_FLEET_FAIL
} from '../types'

export const searchFleetReducer = (state={ searchResult:[] },action) => {
   switch(action.type){
      case SEARCH_FLEET_REQUEST:
         return{ loading: true }
      case SEARCH_FLEET_SUCCESS:
         return {loading: false, searchResult:action.payload}
      case SEARCH_FLEET_FAIL:
         return{ loading: false, error:action.payload}
      default:
         return state
   }
}