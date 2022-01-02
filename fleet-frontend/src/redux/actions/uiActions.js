import { TOGGLE_SIDEBAR } from "../types";


const toggleSidebar = () => dispatch => {
   dispatch({type: TOGGLE_SIDEBAR})
}

export {
   toggleSidebar
}