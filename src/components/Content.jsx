import React, {useContext} from 'react'
import { chatapp } from '../context/chatapp'

const Content = ({user, last, sendmaguser}) => {
  const value = useContext(chatapp)
  const socket = value.socket
  const setmessagesall = value.setmessagesall

  const usermsg = (e)=>{
    let usermsg = e.currentTarget.getElementsByTagName('h1')[0].innerHTML;
    sendmaguser(usermsg)

    socket.on('receive-msg', (receive)=>{
          console.log("message received from server " + receive.sendto + " and " + usermsg)
          if(usermsg == receive.sendto){
            console.log("UI is updated");
            setmessagesall((prevmessages)=>[
              ...prevmessages,
              { type:false, msg:receive.message},
            ])
          }
        })
  }
  return (
    <div onClick={e=>usermsg(e)} className="user hover:cursor-pointer hover:bg-[#595959] flex bg-[#424242] text-white mx-[11px] my-[18px] rounded-[20px] p-[7px] gap-4">
        <img src="../images/default_profile_normal.png" alt="" className="userdm rounded-full w-[50px] h-[50px]" />
        <div className='flex flex-col'>
            <h1 className='text-[19px]'>{user}</h1>
            <p className='text-[12px]'>{last}</p>
        </div>
    </div>
  )
}

export default Content
