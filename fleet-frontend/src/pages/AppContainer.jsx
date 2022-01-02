// import NavBar from '../components/NavBar'
// import {AiFillCloseCircle} from 'react-icons/ai'
// import UserImage from '../images/user.jpg'
import UserProfile from './containers/UserProfile'
import Fleets from './containers/Fleets'
import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import SideBar from '../components/SideBar'
import { useSelector } from 'react-redux'


const AppContainer = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const userLogin =  useSelector(state => state.userLogin)
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  }, [])

  const {user} = userLogin
  console.log(user)
  return (
    <div className="flex flex-col bg-tetiaryColor md:flex-row h-screen transition-height duration-75 ease-out">
      <div className='hidden md:flex h-screen flex-initial'>
        <SideBar user={user && user}/>
      </div>
      <div className='flex md:hidden flex-row md:flex-col'>
        <div className="p-2 w-screen h-16 bg-mainColor flex items-center justify-between shadow-md">
          <FaBars fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />

          <Link to="/">
            <h2 className="font-bold text-5xl">Fleet</h2>
          </Link>

          <Link to="/">
            <img src={user?.image} alt="user" className="w-10 h-10 rounded-full"/>
          </Link>

          {
            toggleSidebar && (
              <div className="h-screen w-300 bg-tetiaryColor z-10 absolute left-0 top-0 animate-slide-in">
                <div className='mb-5'>
                    <FaTimes fontSize={30} className="cursor-pointer absolute right-2 top-2 text-yellow" onClick={() => setToggleSidebar(false)}/>
                  
                  <Link to="/">
                    <h2 className="font-bold text-5xl text-yellow">Fleet</h2>
                  </Link>
                </div>
                <SideBar user={user && user} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
              </div>
            )
          }
        </div>
      </div>
      <div className='p-2 flex-1 h-screen overflow-y-scroll md:pt-0 relative' ref={scrollRef} >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Fleets user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default AppContainer
