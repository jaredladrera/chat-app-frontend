/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import Chat from './Chat';
import { useNavigate } from 'react-router-dom'

const socket = io.connect("http://localhost:3001");

const Room = () => {

    const  navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [user, setuser] = useState([])
  
    const joinRoom = (data) => {
      if(username !== "" && room !== "") {
        socket.emit("join_room", room)
        setShowChat(true);
      }
    }

    useEffect(() => {
        const userloggedIn = localStorage.getItem('userLoggedIn');
        const foundUser = JSON.parse(userloggedIn);
        console.log(foundUser);

        if(userloggedIn) {
            setuser(foundUser);
        } else {
           navigate('/');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userLoggedIn');
        navigate('/');
    }

  return (
    <div className="App">
    {!showChat ? 
      (<div className='joinChatContainer'>

      <h3>Join Chat</h3>
      <h3>Welcome <b>{ user.username }</b></h3>
      <button  onClick={handleLogout}>Logout</button>
      <p>Username</p>
      <input type='text' placaholder="Join..." onChange={() => {setUsername(event.target.value)}}/>
      <p>Room  ID</p>
      <input type='text' placaholder="Room ID..." onChange={() => {setRoom(event.target.value)}}/>
      <button onClick={joinRoom}>Join a room</button>

      </div>)
    :  
      (<Chat socket={socket} username={username} room={room}/>)
    }

    </div>
  )
}

export default Room