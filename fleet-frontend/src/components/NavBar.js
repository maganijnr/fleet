import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlus, FaSearch } from 'react-icons/fa'

const NavBar = ({user, searchItem, setSearchItem}) => {
   const navigate = useNavigate()
   // if(!user) return null
   const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
   return (
      <div className='w-full md:w-656 md:mx-auto h-16 flex items-center justify-between p-1'>
         <div className='flex items-center justify-evenly h-full w-full'>
            <FaSearch fontSize={30} className='text-secColor cursor-pointer' onClick={() => {
               navigate('/search')
            }}/>
            <input
               type="text"
               className="w-full md:w-508 h-8 text-secColor p-2 mx-2 border-secColor border-2 outline-none md:h-10 rounded-lg"
               onChange={(e) => setSearchItem(e.target.value)}
               onFocus={() => navigate('/search')}
               value={searchItem}
               placeholder='Search...'
            />
         </div>
         {userInfo ? <div className='flex items-center'>
            <Link to={`/user-profile/${user?._id}`} className='hidden mr-2 md:flex'>
               <img src={user?.image} alt="user" className="rounded-full w-14 h-14 mr-2"/>
            </Link>
            <Link to="/create-pin">
               <FaPlus fontSize={30}/>
            </Link>
         </div> : null
         }
         
         
      </div>
   )
}

export default NavBar

NavBar.propTypes = {
   user: PropTypes.object
}