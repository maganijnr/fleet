import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = () => {
   return (
      <div className='flex items-center justify-center my-2'>
         <Loader type="BallTriangle" color="#FFCE47" height={70} width={70}/>
      </div>
   )
}

export default Spinner
