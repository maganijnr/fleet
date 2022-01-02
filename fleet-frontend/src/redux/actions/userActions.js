import {
   AUTH_USER_REQUEST,
   AUTH_USER_SUCCESS,
   AUTH_USER_FAIL,
   GET_USER_REQUEST,
   GET_USER_SUCCESS,
   GET_USER_FAIL
} from '../types'

import {client} from '../../data/client'

import {getUserQuery} from '../../utils/query'


const googleResponse = (response) =>  dispatch => {
   try{
      dispatch({type: AUTH_USER_REQUEST})

      localStorage.setItem('user', JSON.stringify(response.profileObj))
      const {name, imageUrl, googleId} = response.profileObj

      const doc = {
         _id: googleId,
         _type:'user',
         userName:name,
         image:imageUrl
      }

      client.createIfNotExists(doc)
      dispatch({type: AUTH_USER_SUCCESS, payload: doc})

   } catch(err){
      dispatch({type: AUTH_USER_FAIL, data: err.response && err.response.data.message})
   }
}

const getUser = () => async dispatch => {
   dispatch({type: GET_USER_REQUEST})
   const userInfo = localStorage.getItem('user') !== 'undefined' 
      ? JSON.stringify(localStorage.getItem('user')) 
      : localStorage.clear

   try{
      const query = getUserQuery(userInfo?.googleId)

      const data = await client.fetch(query)

      dispatch({
         type: GET_USER_SUCCESS,
         payload: data[0]
      })

   }catch(err){
      dispatch({
         type: GET_USER_FAIL,
         payload: err.response && err.response.data.message
      })
   }
}

export {
   googleResponse, 
   getUser
}