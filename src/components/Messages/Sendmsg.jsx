import React, { useContext, useRef } from 'react'
import Send from "./Send"
import Receive from "./Receive"
import { chatapp } from '../../context/chatapp'

const Sendmsg = ({ currentuser, sendto }) => {
    const sendmsg = useRef()
    const value = useContext(chatapp)
    const messagesall = value.messagesall
    const setmessagesall = value.setmessagesall
    const socket = value.socket

    const send = () => {
        if (sendmsg.current.value != "") {
            console.log("emit send msg");

            setmessagesall([...messagesall, { type: true, msg: sendmsg.current.value }])
            let msg = { sender: currentuser, receiver: sendto, msg: sendmsg.current.value }
            socket.emit('send-msg', msg)
            sendmsg.current.value = ""
        }
    }
    return (
        <div>
            <div className="messages text-white fixed w-[97%] md:w-[72%] bottom-[13vh] md:bottom-[16vh] overflow-auto max-h-[78%] md:max-h-[82%]">
                <Receive msg={"Hello this is a chatApp made by Joshi Jay"} />
                {messagesall.map(item => {
                    return (((item.type) ? (<Send key={item.msg} msg={item.msg} />) : (<Receive key={item.msg} msg={item.msg} />))
                    )
                })}
            </div>
            <div className="message w-[93vw] md:w-[70vw] text-white fixed flex bottom-[5vh] ml-[1vw] bg-[#404040] p-[15px] rounded-[35px]">
                <button className='ml-[3px] bg-[#606060] rounded-full w-[30px] h-[33px]'>+</button>
                <input ref={sendmsg} type="text" className=' w-[70vw] md:w-[60vw] mx-[10px] outline-none' placeholder='Send a message' />
                <button onClick={e => send()} className='right-[1vw] bg-[#606060] rounded-full w-[60px] h-[33px]'>Send</button>
            </div>
        </div>
    )
}

export default Sendmsg
