import { FaHome } from "react-icons/fa"
import { Link, NavLink } from "react-router-dom"
const SideBar = ({user, toggleSidebar, setToggleSidebar}) => {
   const categories = [
      {name:'Pets', categoryId:'pets'},
      {name:'Laptops', categoryId:'laptop'},
      {name:'Anime', categoryId:'anime'},
      {name:'Christianity', categoryId:'christianity'},
      {name:'Sports', categoryId:'sports'},
      {name:'Food', categoryId:'food'},
      {name:'Horses', categoryId:'horses'},
   ]
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
         <div className=" flex flex-col items-left">
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
         <Link to="/" className="flex items-center justify-center w-full bottom-0 mt-60">
            <img src={user?.image} alt="user" className="rounded-full w-14 h-14 mr-2"/>
            <h2 className="text-yellow font-bold">{user?.userName}</h2>
         </Link>
      </div>
   )
}

export default SideBar
