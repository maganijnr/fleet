import {useState} from 'react'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { categories } from '../../data/data'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { client } from '../../data/client'

const CreateFleet = ({user}) => {
   const [title, setTitle] = useState('')
   const [about, setAbout] = useState('')
   const [category, setCategory] = useState()
   const [imageAsset, setImageAsset] = useState();
   const [wrongImageType, setWrongImageType] = useState(false)
   const [loading, setLoading] = useState(false)
   const [errors, setErrors] = useState(false)
   const [uploadErr, setUploadErr] = useState(null)
   const navigate = useNavigate()

   const uploadImage = (e) =>{
      const selectedFile = e.target.files[0];
      // uploading asset to sanity
      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
         setWrongImageType(false);
         setLoading(true);
         client
            .assets
            .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
            .then((document) => {
               setImageAsset(document);
               console.log(document)
               setLoading(false);
            })
            .catch((error) => {
               console.log('Upload failed:', error.message);
            });
      } else {
         setLoading(false);
         setWrongImageType(true);
      }
   }

   const savePin = () => {
      if(title && about  && imageAsset?._id && category){
         const doc = {
            _type: 'fleet',
            title,
            about,
            image : {
               _type: 'image',
               asset: {
                  _type: 'reference',
                  _ref: imageAsset?._id
               }
            },
            userId: user._id,
            postedBy: {
               _type: 'postedBy',
               _ref: user._id
            },
            category
         }

         client
            .create(doc)
            .then(() => {
               navigate('/', {replace: true})
            })
      } else {
         setUploadErr("Error in uploading fleet")

         setTimeout( () => {
            setUploadErr(null)
         }, 5000)
      } 
   }


   return (
      <div className='flex flex-col items-center justify-center p-2'>
         {
            errors && <div className='bg-red-300 my-2 p-2 rounded-xl ease-in-out duration-200'><h2 className='text-xl font-semibold text-red-700'>Please fill all fields</h2></div>
         }
         {
            wrongImageType && <div className='bg-red-300 my-2 p-2 rounded-xl ease-in-out duration-200'><h2 className='text-xl font-semibold text-red-700'>Pick correct image format</h2></div>
         }
         <div className='flex flex-col my-2 w-full h-420 md:w-508 items-center justify-center bg-gray-300'>
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
               <label>
                  <div className="flex flex-col items-center justify-center h-full">
                     <div className="flex flex-col justify-center items-center">
                     <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                     </p>
                     <p className="text-lg">Click to upload</p>
                     </div>

                     <p className="mt-32 text-gray-400 p-1 text-sm">
                     Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                     </p>
                  </div>
                  <input
                     type="file"
                     name="upload-image"
                     onChange={uploadImage}
                     className="w-0 h-0"
                  />
               </label>
               ) : (
               <div className="relative h-full">
                  <img
                     src={imageAsset?.url}
                     alt="uploaded-pic"
                     className="h-full w-full"
                  />
                  <button
                     type="button"
                     className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                     onClick={() => setImageAsset(null)}
                  >
                     <MdDelete />
                  </button>
               </div>
               )}
            {
               loading && <Spinner/>
            }
         </div>
         <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Add your title"
               className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
            />
            {user && (
               <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
               <img
                  src={user.image}
                  className="w-10 h-10 rounded-full"
                  alt="user-profile"
               />
               <p className="font-bold">{user.userName}</p>
               </div>
            )}
            <input
               type="text"
               value={about}
               onChange={(e) => setAbout(e.target.value)}
               placeholder="Tell everyone what your Fleet is about"
               className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            />
            <div className="flex flex-col">
               <div>
                  <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Fleet Category</p>
                  <select
                     onChange={(e) => {
                        setCategory(e.target.value);
                     }}
                     className="outline-none w-4/5 text-base border-b-2 border-gray-200 text-secColor p-2 rounded-md cursor-pointer"
                  >
                     <option value="others" className="sm:text-bg bg-white">Select Category</option>
                     {categories.map((item) => (
                        <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name} key={item.categoryId}>
                        {item.name}
                        </option>
                     ))}
                  </select>
                  </div>
                  <div className="flex justify-end items-end mt-5">
                  <button
                     type="button"
                     onClick={savePin}
                     className="text-secColor font-semibold bg-mainColor p-1 rounded-lg w-28 outline-none"
                  >
                     Save Fleet
                  </button>
               </div>
            </div>

         </div>
      </div>
   )
}

export default CreateFleet
