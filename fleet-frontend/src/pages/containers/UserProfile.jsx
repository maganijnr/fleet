import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MasonryLayout from "../../components/MasonryLayout";
import { client } from "../../data/client";
import {GoogleLogout} from 'react-google-login'

const UserProfile = () => {
   const [user, setUser] = useState(null)
   const [text, setText] = useState('Created')
   const [fleetPost, setFleetPost] = useState(null)
   const navigate = useNavigate()
   
   const {userId} = useParams()


   useEffect(() => {
      const fetchUser = `*[_type == 'user' && _id == '${userId}']{
         userName,
         image
      }`
      client
         .fetch(fetchUser)
         .then((data) => setUser(data[0]))

   }, [userId])

   useEffect(() => {
      if(text === "Created"){
         const fetchUserFleet = `*[_type == 'fleet' && userId == '${userId}'] | order(_createdAt desc){
            image{
               asset -> {
                  url
               }
            },
            _id,
            destination,
            save[]{
               postedBy -> {
                  _id, userName, image
               }
            },
            title, 
            about,
            category
         }`

         client
            .fetch(fetchUserFleet)
            .then(data => {
               console.log(data)
               setFleetPost(data)
            })
      } else {
         const fetchSavedFleet = `*[_type == 'fleet' && '${userId}' in save[].userId] | order(_createdAt desc){
            image{
               asset -> {
                  url
               }
            },
            _id,
            destination,
            save[]{
               postedBy -> {
                  _id, userName, image
               }
            },
            title, 
            about,
            category
         }`
         
         client
            .fetch(fetchSavedFleet)
            .then(data => {
               console.log(data)
               setFleetPost(data)
            })
      }
   }, [text, userId])


   console.log(user)

   const logout = () => {
      localStorage.clear()
      navigate('/login')
   }

   const activeStyle = "bg-mainColor font-semibold text-black text-xl p-2 rounded-xl ease-in-out duration-100"
   const notActiveStyle = "bg-gray-300 font-semibold text-black text-xl p-2 rounded-xl ease-in-out duration-100"
   return (
      <div className="p-2">
         <div className="flex items-center flex-col">
            <img
               src={user?.image}
               className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full"
               alt="user"
            />
            <h2 className="font-semibold text-2xl md:text-4xl mt-2">{user?.userName}</h2>
            {/* <h2 className="font-semibold text-2xl md:text-4xl mt-2">{user?.email}</h2> */}
         </div>
         <div className="flex items-center justify-center mt-8">
            <button 
               onClick={() => {
                  setText("Created")
               }} 
               className={text === "Created" ? activeStyle: notActiveStyle}
               style={{marginRight:"5px"}}
            >  
               Fleets
            </button>
            <button 
               onClick={() => {
                  setText("Saved")
               }} 
               className={text === "Saved" ? activeStyle : notActiveStyle}
               style={{marginLeft:"5px"}}
            >
               Saved Fleets
            </button>
         </div>
         <div className="mt-5">
            {
               fleetPost && <MasonryLayout fleet={fleetPost}/>
            }
         </div>
         <div className="w-32 mx-auto">
            <GoogleLogout
               clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
               render={(renderProps) => (
                  <button
                     type="button"
                     className='bg-mainColor p-2 text-sm font-semibold rounded-md flex items-center justify-center cursor-pointer w-full'
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                  >
                     Logout
                  </button>
               )}
               onLogoutSuccess={logout}
               cookiePolicy='single_host_origin'
            />
         </div>
      </div>
   )
}

export default UserProfile
