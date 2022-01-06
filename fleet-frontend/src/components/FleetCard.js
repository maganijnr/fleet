import {useState} from 'react'
import { FaDownload } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { urlFor, client } from '../data/client'
import { v4 as uuidv4} from 'uuid'


const FleetCard = ({post:{image, destination, postedBy, _id, title, save}}) => {
   const [postHover, setPostHover] = useState(false)
   const [savePost, setSavePost] = useState(false)
   const navigate = useNavigate(`fleet-detail/${_id}`)

   const userInfo = localStorage.getItem('user') !== 'undefined' 
      ? JSON.parse(localStorage.getItem('user') ) 
      : localStorage.clear()

   const alreadySaved = !!save?.filter(item => item?.postedBy?._id === userInfo?.googleId)?.length
   
   const saveFleetPost = (id) => {
      if(!alreadySaved){
         setSavePost(true)

         client
            .patch(id)
            .setIfMissing({ save: []})
            .insert('after','save[-1]', [{
               _key: uuidv4(),
               userId: userInfo?.googleId,
               postedBy:{
                  _type: 'postedBy',
                  _ref: userInfo?.googleId
               }
            }])
            .commit()
            .then(() => {
               window.location.reload()
               setSavePost(false)
            })
      }
   }

   return (
      <div 
         className='m-5 relative cursor-pointer w-auto rounded-lg overflow-hidden'
         onMouseEnter={()=> setPostHover(true)}
         onMouseLeave={() => setPostHover(false)}
         onClick={() => navigate(`fleet-detail/${_id}`, {replace: true})}
      >
         <img 
            src={urlFor(image).width(300).url()} 
            alt="post" 
            className='w-full rounded-lg'
         />
         {
            postHover && (
               <div className='w-full h-full absolute bg-blackOverlay duration-1000 ease-in-out z-10 top-0 left-0 flex flex-col justify-between' style={{height:'100%'}}>
                  <div className="flex items-center justify-between p-1">
                     <a
                        href={`${image?.asset?.url}?.dl=`}
                        onClick={(e) => e.stopPropagation()}
                        download
                     >
                        <FaDownload className='text-yellow'/>
                     </a>

                     {
                        alreadySaved 
                           ? <button className='text-secColor font-semibold bg-mainColor p-1 rounded-lg'>
                              {save?.length} saved
                           </button> 
                        : <button className='text-secColor font-semibold bg-mainColor p-1 rounded-lg' onClick={(e) => {
                           e.stopPropagation()
                           saveFleetPost(_id)
                        }}>
                              {save?.length} save
                           </button>
                     }
                  </div>

                  <div className='flex items-center justify-between p-1'>
                     <Link to={`user-profile/${postedBy?._id}`}>
                        <img src={postedBy?.image} alt="user" className='w-8 h-8 rounded-full border-2 border-yellow'/>
                     </Link>
                  </div>
               </div>
            )
         }
      </div>
   )
}

export default FleetCard
