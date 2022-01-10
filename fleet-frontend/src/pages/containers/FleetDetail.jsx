import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import {client} from '../../data/client'
import { v4 as uuidv4} from 'uuid'
import { FaDownload } from 'react-icons/fa'
import MasonryLayout from '../../components/MasonryLayout'

const FleetDetail = ({user}) => {
   const { fleetId } = useParams();
   const [fleets, setFleets] = useState();
   const [fleetDetail, setFleetDetail] = useState();
   const [comment, setComment] = useState('');
   const [addingComment, setAddingComment] = useState(false);

   const userInfo = localStorage.getItem('user') !== 'undefined' 
      ? JSON.parse(localStorage.getItem('user') ) 
      : localStorage.clear()
   
   const alreadySaved = !!fleetDetail?.save?.filter(item => item?.postedBy?._id === userInfo?.googleId)?.length

   const fecthFleetDetails = () => {
      const fleetDetailQuery = `*[_type == 'fleet' && _id == '${fleetId}']{
         image{
            asset -> {
               url
            }
         },
         _id,
         title,
         about,
         save[]{
            postedBy ->  {
               _id,
               userName,
               image
            }
         },
         category,
         comments[]{
            _key,
            comment,
            postedBy ->  {
               _id,
               userName,
               image
            }
         },
         postedBy ->  {
            _id,
            userName,
            image
         }
      }`

      if(fleetDetailQuery){
         client
            .fetch(fleetDetailQuery)
            .then((data) => {
               setFleetDetail(data[0])
               console.log(data[0])

               if(data[0]){
                  const similarFleetsQuery = `*[_type == 'fleet' && category == '${data[0].category}']{
                     image{
                        asset -> {
                           url
                        }
                     },
                     _id,
                     title,
                     about,
                     save[]{
                        postedBy ->  {
                           _id,
                           userName,
                           image
                        }
                     },
                     category,
                     comments[]{
                        _key,
                        comment,
                        postedBy ->  {
                           _id,
                           userName,
                           image
                        }
                     },
                     postedBy ->  {
                        _id,
                        userName,
                        image
                     }
                  }`
                  client
                     .fetch(similarFleetsQuery)
                     .then((res) => {
                        setFleets(res)
                        console.log(res)
                     })
               }
            })
      }
   }

   useEffect(() => {
      fecthFleetDetails()
   }, [fleetId])

   //Save a post
   const savePost = (id) => {
      if(!alreadySaved){
         savePost(true)
         client
            .patch(id)
            .setIfMissing({save: []})
            .insert('after','save[-1]',[{
               _key: uuidv4(),
               userId: userInfo?.googleId,
               postedBy: {
                  _type: 'user',
                  _ref: userInfo?.googleId
               }
            }])
            .commit()
            .then(() => {
               window.location.reload()
               savePost(false)
            })
      }
   }


   //Make a comment
   const addComment = () => {
      if (comment) {
         setAddingComment(true);

         client
         .patch(fleetId)
         .setIfMissing({ comments: [] })
         .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: userInfo.googleId } }])
         .commit()
         .then(() => {
            fecthFleetDetails();
            setComment('');
            setAddingComment(false);
         });
      }
   };

   return(
      <div className='h-full w-full p-1 flex flex-col'>
         <div className='w-full h-full flex flex-col md:flex-row'>
            <div className='relative flex flex-1 items-center justify-center overflow-hidden h-400 rounded-lg md:h-600'>
               <img src={fleetDetail?.image?.asset?.url} alt=""/>
            </div>
            <div className='flex-1 p-2 flex flex-col'>
               <div className='flex items-center justify-between mb-1'>
                  <a
                     href={`${fleetDetail?.image?.asset?.url}`}
                     download
                     onClick={(e) => {
                        e.stopPropagation()
                     }}
                  >
                     <FaDownload fontSize={25} className='text-color'/>
                  </a>
                  {
                        alreadySaved 
                           ? <button className='text-secColor font-semibold bg-mainColor p-1 rounded-lg'>
                              {fleetDetail?.save?.length} Saved
                           </button> 
                        : <button className='text-secColor font-semibold bg-mainColor p-1 rounded-lg' onClick={(e) => {
                           e.stopPropagation()
                           savePost(fleetDetail?._id)
                        }}>
                              {fleetDetail?.save?.length} Save
                        </button>
                  }
               </div>
               <div className=' my-1 p-1 text-left'>
                  <h2 className='font-bold text-4xl md:text-5xl my-4'>
                     {fleetDetail?.title}
                  </h2>
                  <h3 className='font-medium text-xl md:text-2xl'>
                     {fleetDetail?.about}
                  </h3>
               </div>
               <div className='my-1 p-1 text-left flex flex-col items-start'>
                  <Link to={`/user-profile/${userInfo?.googleId}`}>
                     <h2 className='font-medium text-lg'>Created By: {fleetDetail?.postedBy?.userName} </h2>
                  </Link>
               </div>
               <div className='my-1 p-1'>
                  <h2 className="mt-5 text-2xl">Comments</h2>
                  <div className="max-h-370 overflow-y-auto">
                     {
                        fleetDetail?.comments <= 0 
                           ? <div>
                                 No comments...
                              </div> 
                           : fleetDetail?.comments?.map((item) => (
                              <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                                 <img
                                 src={item.postedBy?.image}
                                 className="w-10 h-10 rounded-full cursor-pointer"
                                 alt="user-profile"
                                 />
                                 <div className="flex flex-col">
                                 <p className="font-bold">{item.postedBy?.userName}</p>
                                 <p>{item.comment}</p>
                                 </div>
                              </div>
                           ))
                     }
                  </div>
                  <div className='w-full flex items-center'>
                     {user && (
                        <div className="flex gap-2 mt-2 mb-2 mr-5 items-center bg-white rounded-lg ">
                        <img
                           src={user.image}
                           className="w-10 h-10 rounded-full"
                           alt="user-profile"
                        />
                        </div>
                     )}

                     <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Make a comment on the fleet"
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 w-full"
                     />
                  </div>
                  <div className=' my-2 p-2 text-center max-w-xs mx-auto'>
                     <button className='text-secColor font-semibold bg-mainColor p-2 rounded-lg w-full' onClick={addComment}>
                        Submit
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className="mt-5 w-full">
            <h2 className='text-3xl font-bold text-center'>Similar Fleets</h2>
            {
               fleets && <MasonryLayout fleet={fleets}/>
            }
         </div>
      </div>
   )
}

export default FleetDetail
