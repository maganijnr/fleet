import { FaHome } from "react-icons/fa"
import { Link, NavLink } from "react-router-dom"
import { categories } from "../data/data"
const SideBar = ({user, setToggleSidebar}) => {

   const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

   const activeLink = "text-yellow flex gap-2 items-center text-lg font-bold border-r-4 border-yellow p-2"
   const notActiveLink = "text-primary flex gap-2 items-center text-lg font-bold p-2"
   return (
      <div className="flex flex-col my-5 w-300 bg-tetiaryColor md:my-0">
         <NavLink
            to="/"
            className={({isActive}) => isActive ? activeLink : notActiveLink}
            onClick={() => setToggleSidebar(false)}
         >
            <FaHome fontSize={30}/> Home
         </NavLink>
         <h3 className="text-primary text-center p-2 text-lg font-bold border-b-2 border-primary mb-4">Discover More</h3>
         <div className=" flex flex-col items-left max-h-72 md:max-h-96 overflow-y-scroll">
            {
               categories.slice(0, categories.length -1).map(catg => (
                  <NavLink
                     to={`category/${catg.categoryId}`}
                     className={({isActive}) => isActive ? activeLink : notActiveLink}
                     onClick={() => setToggleSidebar(false)}
                     key={catg.categoryId}
                  >
                     {catg.name}
                  </NavLink>
               ))
            }
         </div>
         {
            userInfo 
               ? <Link to={`/user-profile/${userInfo?.googleId}`} className="flex items-center justify-center w-full bottom-0 mt-36">
                  <img src={user?.image} alt="user" className="rounded-full w-14 h-14 mr-2"/>
                  <h2 className="text-yellow font-bold">{user?.userName}</h2>
               </Link> 
               :<Link to="/login" className="bg-mainColor mx-auto p-2 text-lg font-bold rounded-lg flex items-center justify-center w-40 bottom-0 mt-36">
                  Login
               </Link>
         }
      </div>
   )
}

export default SideBar
