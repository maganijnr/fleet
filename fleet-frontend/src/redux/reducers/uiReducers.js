import { TOGGLE_SIDEBAR } from "../types"

export const toggleSideBarReducer = (state={ isOpen:false },action) =>{
   switch(action.type){
      case TOGGLE_SIDEBAR:
         return{
            isOpen: !state.isOpen
         }
      default:
         return state
   }
}