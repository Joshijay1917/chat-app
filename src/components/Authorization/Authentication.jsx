import { useState } from 'react'
import React from 'react'
import Signup from './Signup'
import Signin from './Signin'

const Authentication = ({check}) => {
    const [change, setchange] = useState(true)

    const changeform = ()=>{
        setchange(!change)
    }

  return (
    <>
      <div className="left w-full absolute h-full"><img className='w-full h-full' src="./images/background.jpg" alt="" /></div>
      <div className="logo absolute z-1 w-[70vw] left-[15vw] md:left-0 md:w-[57%] flex-col h-[37vh] md:h-dvh items-center flex justify-center">
        <img className='rounded-full w-[255px] h-[200px] invert relative' src="../images/chat-06-removebg-preview.png" alt="" />
        <h1 className='text-white text-[25px] font-bold relative bottom-[4vh] text-nowrap md:bottom-[8vh]'>Welcome To Chat App!</h1>
        </div>
      <div className="right flex justify-center items-center w-[90vw] md:w-[26vw] relative left-[6vw] md:left-[68vw] h-[60vh] top-[34vh] md:top-[26vh] z-1 bg-white rounded-3xl">
        {change && <Signup changeform={changeform}/>}
        {!change && <Signin changeform={changeform} auth={check}/>}
      </div>
    </>
  )
}

export default Authentication
