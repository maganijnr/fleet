import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {userLoginReducer, userInfoReducer} from './reducers/userReducer'
import { toggleSideBarReducer } from './reducers/uiReducers'
import { searchFleetReducer } from './reducers/fleetReducers'


const middlewares = [thunk, logger]

const initialState = {}

const reducer = combineReducers({
   userLogin: userLoginReducer,
   userInfo: userInfoReducer,
   searchFleet: searchFleetReducer,
   toggleSideBar: toggleSideBarReducer
})

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store