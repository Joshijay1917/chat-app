import React, { useState, useEffect, useContext } from 'react'
import Content from './Content'
import { chatapp } from "../context/chatapp.js"
import Sendmsg from './Messages/Sendmsg'

const Main = ({ currentuser, receivedmsg }) => {
    const [alluser, setalluser] = useState(false)
    const [userneedtosend, setuserneedtosend] = useState(false)
    const [receiver, setreceiver] = useState(null)
    const [chatedusers, setchatedusers] = useState([])
    const value = useContext(chatapp)
    const socket = value.socket
    const setmessagesall = value.setmessagesall

    useEffect(() => {
        if (alluser) {
            console.log("getuser");
            getusers();
        }
        else{
            console.log("chatuser");
            chatusers();
        }
    }, [alluser])

    useEffect(() => {
        if (receivedmsg) {
            console.log("message received from server " + receivedmsg.sendto + " and " + receiver)
            if(receiver == receivedmsg.sendto){
              console.log("UI is updated");
              setmessagesall((prevmessages)=>[
                ...prevmessages,
                { type:false, msg:receivedmsg.message},
              ])
            }
        }

    }, [receivedmsg])

    useEffect(() => {
        if(receiver){
            console.log("chat history of " + currentuser + " and " + receiver);
            setmessagesall([])
            
            socket.emit('chat-history', {currentuser:currentuser, sendto:receiver})
        }

    }, [userneedtosend])

    console.log("function not call " + receiver);

    const clickeduser = (e) => {
        setreceiver(e.currentTarget.getElementsByTagName('h1')[0].innerHTML)
        setuserneedtosend(true)
    }

    const close = () => {
        setreceiver(null)
        setuserneedtosend(false)
    }

    const getusers = () => {
        socket.emit('getuser')
        socket.on('all-users', (users) => {
            value.setusers(users)
        })
    }

    const chatusers = ()=>{
        socket.emit('chateduser', {currentuser:currentuser})
        socket.on('chted-users', (chatedusers)=>{
            setchatedusers(chatedusers)
        })
    }

    const togglealluser = (e) => {
        (e.target.innerHTML == "All users") ? setalluser(true) : setalluser(false);
    }

    return (
        <div className='block md:flex w-dvw h-dvh'>
            <div className="background w-full absolute h-full"><img className='w-full h-full' src="/images/background.jpg" alt="" /></div>
            <div className='left bg-[#272727] w-[98vw] md:w-[27vw] rounded-[5%] h-[97%] relative flex flex-col top-[10px] left-[5px]'>
                <div className="top w-full flex justify-between items-center mt-[2vh]">
                    <div className='text-white text-2xl ml-[28px] font-bold'>Messages</div>
                    <img src="/images/default_profile_normal.png" alt="" className="userdm rounded-full w-[60px] h-[60px] mr-[2vw]" />
                </div>
                <hr className="text-[#979797] w-full mt-[20px]" />
                <div className="options flex w-full bg-[#272727] text-white text-[17px] h-[6%] justify-center items-center">
                    <p onClick={e => togglealluser(e)} className='hover:cursor-pointer hover:bg-[#575757] w-1/2 text-center h-full pt-[1.5vh]'>Chat</p>
                    <p onClick={e => togglealluser(e)} className='hover:cursor-pointer hover:bg-[#575757] w-1/2 text-center h-full pt-[1.5vh]'>All users</p>
                </div>
                <hr className="text-[#979797] w-full" />
                <div className="content w-full">
                    {alluser && value.users.map(user => {
                        return (!(user.username == currentuser) && <Content key={user._id} userclick={clickeduser} user={user.username} />)
                    })}
                    {!alluser && chatedusers.map(user => {
                        return <Content key={user._id} userclick={clickeduser} user={user.username} />
                    })}
                </div>
            </div>
            <div className={userneedtosend ? 'contents' : 'hidden md:contents'}>
                <div className="right overflow-hidden bg-[#272727] w-[97%] md:w-[72%] h-[97%] rounded-[3%] absolute md:relative top-[10px] left-[10px]">
                    {userneedtosend && <div onClick={e => close()} className="close block md:hidden bg-[#606060] text-white text-[32px] px-[18px] mt-[15px] ml-[15px] rounded-full w-[55px] h-[55px]">x</div>}
                    {userneedtosend && <Sendmsg sendto={receiver} currentuser={currentuser} />}
                    {!userneedtosend && <div className="logo absolute z-1 w-[70vw] left-[15vw] md:left-0 md:w-[100%] flex-col h-[37vh] md:h-dvh items-center flex justify-center">
                        <img className='rounded-full w-[255px] h-[200px] invert relative' src="/images/chat-06-removebg-preview.png" alt="" />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Main
