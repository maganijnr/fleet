import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FaPlus, FaSearch } from 'react-icons/fa'

const NavBar = ({user, searchItem, setSearchItem}) => {
   if(!user) return null
   return (
      <div className='w-full md:w-656 md:mx-auto h-16 flex items-center justify-between p-1'>
         <div className='flex items-center justify-evenly h-full w-full'>
            <FaSearch fontSize={30} className='text-secColor'/>
            <input
               type="text"
               className="w-full md:w-508 h-8 text-secColor p-2 mx-2 border-secColor border-2 outline-none md:h-10 rounded-lg"
               onChange={(e) => setSearchItem(e.target.value)}
               value={searchItem}
               placeholder='Search...'
            />
         </div>
         {user && <div className='flex items-center'>
            <Link to="/" className='hidden mr-2 md:flex'>
               <img src={user?.image} alt="user" className="rounded-full w-14 h-14 mr-2"/>
            </Link>
            <Link to="/create-pin">
               <FaPlus fontSize={30}/>
            </Link>
         </div>}
         {
            !user && <div>
            <Link to="/create-pin">
               <h2>Login</h2>
            </Link>
         </div>
         }
         
      </div>
   )
}

export default NavBar

NavBar.propTypes = {
   user: PropTypes.object
}