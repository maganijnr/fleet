import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = () => {
   return (
      <div className='flex items-center justify-center my-2'>
         <Loader type="BallTriangle" color="#FFCE47" height={50} width={50}/>
      </div>
   )
}

export default Spinner
