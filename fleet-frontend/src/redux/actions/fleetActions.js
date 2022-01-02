import {
   SEARCH_FLEET_REQUEST,
   SEARCH_FLEET_SUCCESS,
   SEARCH_FLEET_FAIL
} from '../types'

import {client} from '../../data/client'
import {searchFleetQuery} from '../../utils/query'

export const findFleet = (searchItem) => async dispatch => {
   try {
      dispatch({ type:SEARCH_FLEET_REQUEST })

      if(searchItem){
         const query = searchFleetQuery(searchItem)

         const data = client.fetch(query)

         dispatch({
            type:SEARCH_FLEET_SUCCESS,
            payload: data
         })
      }
   } catch (error) {
      dispatch({
         type:SEARCH_FLEET_FAIL,
         payload: error
      })
   }
}