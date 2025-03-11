import { useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import { chatapp } from './context/chatapp'
import Authentication from './components/Authorization/Authentication'
import Main from './components/Main'

function App() {
  const [messagesall, setmessagesall] = useState([])
  const [users, setusers] = useState([])
  const [socket, setsocket] = useState()
  const [auth, setauth] = useState(false)
  const [currentuser, setcurrentuser] = useState()
  const [receiver, setreceiver] = useState()

  const authorization = (username) => {
    setauth(true);
    setcurrentuser(username)

    const newSocket = io('http://localhost:3000/', { query: { username: username } });
    setsocket(newSocket);

    newSocket.on('connect', () => {
      console.log("connected to server");
    })

    newSocket.on('receive-msg', (receive) => {
      setreceiver(receive)
    })

    newSocket.on('disconnect', username)

    newSocket.on('all-msg', (receive) => {
      setmessagesall((prevmessages) => [...prevmessages, { type: receive.type, msg: receive.message }]);
    })
  }
  console.log("current user is " + currentuser);

  return (
    <>
      <chatapp.Provider value={{ messagesall, setmessagesall, socket, users, setusers }}>
        {!auth && <Authentication check={authorization} />}
        {auth && <Main currentuser={currentuser} receivedmsg={receiver}/>}
      </chatapp.Provider>
    </>
  )
}

export default App
