import React, { useEffect, useState, useContext } from 'react'
import Content from './Content'
import Sendmag from './Messages/Sendmag'
import { chatapp } from '../context/chatapp'

const Navbar = ({ currentuser }) => {
  const value = useContext(chatapp)
  const [users, setusers] = useState([])
  const [usermsg, setusermsg] = useState(false)
  const socket = value.socket
  const setmessagesall = value.setmessagesall

  const close = ()=>{
    setmessagesall([])
    setusermsg("")
  }

  useEffect(() => {
    
    if(usermsg){
      console.log("usermsg is chage");
      socket.emit('chat-history', {currentuser:currentuser, sendto:usermsg})
    }

  }, [usermsg])

  useEffect(() => {
    const getusers = async () => {
      let a = await fetch('http://localhost:3000/getuser', { method: "GET" })
      setusers(await a.json())
    }
    getusers();
  }, [])
  
  return (
    <div className='block md:flex w-dvw h-dvh'>
      <div className="left w-full absolute h-full"><img className='w-full h-full' src="./images/background.jpg" alt="" /></div>
      <div className='left bg-[#272727] w-[98vw] md:w-[27vw] rounded-[5%] h-[97%] relative flex flex-col top-[10px] left-[5px]'>
        <div className="top w-full flex justify-between items-center mt-[2vh]">
          <div className='text-white text-2xl ml-[28px] font-bold'>Messages</div>
          <img src="../images/default_profile_normal.png" alt="" className="userdm rounded-full w-[60px] h-[60px] mr-[2vw]" />
        </div>
        <div className="content w-full">
          {users.map(user=>{
            return (!(user.username == currentuser) && <Content key={user._id} sendmaguser={setusermsg} user={user.username} last={"hey i am using this new chatApp"} />)
          })}
        </div>
      </div>
      <div className={usermsg? 'contents' : 'hidden md:contents'}>
      <div className="right overflow-hidden bg-[#272727] w-[97%] md:w-[72%] h-[97%] rounded-[3%] absolute md:relative top-[10px] left-[10px]">
        {usermsg && <div onClick={e=>close()} className="close block md:hidden bg-[#606060] text-white text-[32px] px-[18px] mt-[15px] ml-[15px] rounded-full w-[55px] h-[55px]">x</div>}
        {usermsg && <Sendmag sendto={usermsg} currentuser={currentuser}/>}
        {!usermsg && <div className="logo absolute z-1 w-[70vw] left-[15vw] md:left-0 md:w-[100%] flex-col h-[37vh] md:h-dvh items-center flex justify-center">
        <img className='rounded-full w-[255px] h-[200px] invert relative' src="../images/chat-06-removebg-preview.png" alt="" />
        </div>}
      </div>
      </div>
    </div>
  )
}

export default Navbar
