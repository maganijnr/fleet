import Fleet from './Fleet'
import FleetDetail from './FleetDetail'
import NavBar from '../../components/NavBar'
import SearchFleet from './SearchFleet'
import CreateFleet from './CreateFleet'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

const Fleets = ({user, loading, setLoading}) => {
   const [searchItem, setSearchItem] = useState('')
   return (
      <div className='p-2'>
         <NavBar 
            user={user && user} 
            searchItem={searchItem} 
            setSearchItem={setSearchItem} 
         />
         <Routes>
            <Route path='/' element={<Fleet loading={loading} setLoading={setLoading}/>}/>
            <Route path='/category/:categoryId' element={<Fleet loading={loading} setLoading={setLoading}/>}/>
            <Route path='/fleet-detail/:fleetId' element={<FleetDetail/>}/>
            <Route path='/create-pin' element={<CreateFleet/>}/>
            <Route path='/search' element={<SearchFleet/>}/>
         </Routes>
      </div>
   )
}

export default Fleets
