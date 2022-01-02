import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaPlusSquare, FaSearch } from 'react-icons/fa'

const NavBar = ({user, searchItem, setSearchItem}) => {

   if(!user) return null
   return (
      <div className='w-full md:w-656 md:mx-auto h-16 flex items-center justify-between p-1'>
         <div className='flex items-center justify-evenly h-full w-full'>
            <FaSearch fontSize={30} className='text-yellow'/>
            <input
               type="text"
               className="w-full md:w-508 h-8 text-primary p-2 mx-2 bg-blackOverlay border-yellow border-2 outline-none md:h-10 rounded-lg"
               onChange={(e) => setSearchItem(e.target.value)}
               value={searchItem}
               placeholder='Search...'
            />
         </div>
         <Link to="/" className='hidden md:flex'>
            <img src={user?.image} alt="user" className="w-12 h-12 rounded-full"/>
         </Link>
         <Link to="/create-pin">
            <FaPlusSquare fontSize={30} className='text-yellow'/>
         </Link>
      </div>
   )
}

export default NavBar

NavBar.propTypes = {
   user: PropTypes.object
}