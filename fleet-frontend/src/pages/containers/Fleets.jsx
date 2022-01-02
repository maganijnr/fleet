import Fleet from './Fleet'
import FleetDetail from './FleetDetail'
import NavBar from '../../components/NavBar'
import SearchFleet from './SearchFleet'
import CreateFleet from './CreateFleet'
import { Routes, Route } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { useState } from 'react'
import Spinner from '../../components/Spinner'

const Fleets = () => {
   const [searchItem, setSearchItem] = useState('')

   const userLogin = useSelector(state => state.userLogin)
   const { user } = userLogin

   console.log(searchItem)
   return (
      <div className='p-2'>
         <NavBar 
            user={user && user} 
            searchItem={searchItem} 
            setSearchItem={setSearchItem} 
         />
         <Routes>
            <Route path='/' element={<Fleet/>}/>
            <Route path='/category/:categoryId' element={<Fleet/>}/>
            <Route path='/fleet-detail/:fleetId' element={<FleetDetail/>}/>
            <Route path='/create-pin' element={<CreateFleet/>}/>
            <Route path='/search' element={<SearchFleet/>}/>
         </Routes>
      </div>
   )
}

export default Fleets
