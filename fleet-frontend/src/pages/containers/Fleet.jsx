import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { findFleet } from '../../redux/actions/fleetActions'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'

const Fleet = () => {
   const dispatch = useDispatch()
   const [fleets, setfleets] = useState([])
   const searchFleet = useSelector(state => state.searchFleet)
   const {categoryId} = useParams()
   const {data, loading} = searchFleet

   useEffect(() => {
      if(categoryId){
         dispatch(findFleet(categoryId))
         setfleets(data)
      } else{
         setfleets(data)
      }
   }, [categoryId, dispatch, data])
   
   if(loading) return <Spinner/>
   return (
      <div>
         <h2 className='text-yellow'>Fleet</h2>
      </div>
   )
}

export default Fleet
