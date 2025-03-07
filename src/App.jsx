import { useState } from 'react'
import './App.css'
import Authentication from './components/Authorization/Authentication'
import Navbar from './components/Navbar'
import { io } from 'socket.io-client'
import { chatapp } from './context/chatapp'

function App() {
  const [messagesall, setmessagesall] = useState([])
  const [socket, setsocket] = useState()
  const [auth, setauth] = useState(false)
  const [currentuser, setcurrentuser] = useState()

  const authorization = (username)=>{
    setauth(true);
    setcurrentuser(username)

    const newSocket = io('http://localhost:3000/');
    setsocket(newSocket);

    newSocket.on('connect', ()=>{
      // console.log("connected to server");
    })

    newSocket.emit('update-id', username)

    newSocket.on('disconnect', username)

    newSocket.on('all-msg', (receive)=>{
      setmessagesall((prevmessages)=>[...prevmessages, { type:receive.type, msg:receive.message}]);
    })
  }
  console.log("current user is " + currentuser);
  return (
    <>
    <chatapp.Provider value={{messagesall, setmessagesall, socket}}>
    {!auth && <Authentication check={authorization}/>}
    {auth && <Navbar currentuser={currentuser}/>}
    </chatapp.Provider>
    </>
  )
}

export default App
