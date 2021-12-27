import {
   AUTH_USER_REQUEST,
   AUTH_USER_SUCCESS,
   AUTH_USER_FAIL
} from '../types'
import {useNavigate, Redirect} from 'react-router-dom'
import {client} from '../../data/client'


const googleResponse = (response) => async dispatch => {
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

export {
   googleResponse
}