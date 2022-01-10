import BgVideo from '../video/video.mp4'
import {GoogleLogin} from 'react-google-login'
import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { client } from '../data/client'

const LoginPage = () => {
   const navigate = useNavigate()

   const responseGoogle = (response) =>{
      localStorage.setItem('user', JSON.stringify(response.profileObj))


      const {imageUrl,googleId, givenName, familyName} = response.profileObj

      const doc = {
         _id:googleId,
         _type: "user",
         userName: givenName + " " + familyName,
         image: imageUrl
      }

      client
         .createIfNotExists(doc)
         .then(() => navigate('/', {replace: true}))
         .catch(err => err)
   }

   return (
      <div className='flex items-center justify-center flex-col h-full'>
         <div className='relative w-full h-full'>
            <video
               src={BgVideo}
               type='video/mp4'
               autoPlay
               loop
               controls={false}
               muted
               className='w-full h-100vh object-cover'
            />

            <div className='absolute h-full w-full bg-blackOverlay flex flex-col items-center justify-center top-0 left-0'>
               <div className='p-5'>
                  <h2 className='text-yellow font-bold text-6xl'>FLEET</h2>
               </div>
               
               <div className='shadow-2xl'>
                  <GoogleLogin
                     clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                     render={(renderProps) => (
                        <button
                           type="button"
                           className='bg-secondaryColor p-2 text-sm font-semibold rounded-md flex items-center cursor-pointer'
                           onClick={renderProps.onClick}
                           disabled={renderProps.disabled}
                        >
                           <FcGoogle fontSize={20} className='mr-1'/>
                           Sign In With Google
                        </button>
                     )}
                     onSuccess={responseGoogle}
                     onFailure={responseGoogle}
                     cookiePolicy='single_host_origin'
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default LoginPage
