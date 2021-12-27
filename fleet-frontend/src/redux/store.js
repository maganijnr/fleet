import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {userLoginReducer} from './reducers/userReducer'


const middlewares = [thunk, logger]

const initialState = {}

const reducer = combineReducers({
   userLogin: userLoginReducer
})

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store