import React, { useEffect, useState, useContext } from 'react';
import socketIOClient from "socket.io-client";
import ChatContext from '../context/ChatContext';
import ChatRoom from './chatRoom';
import '../css/login.css';
import '../css/admin.css';
import ChatRoomOff from './chatRoomOff';

const ENDPOINT = process.env.REACT_APP_HOST;

function Admin() {
  const { setUsername, setRoomSecret } = useContext(ChatContext);
  const [rooms, setRooms] = useState([]);
  const [isCall, setIsCall] = useState(false)

  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.emit('joinAdmin');
  }, []);

  useEffect(() => {
    console.log('editando');
  }, [rooms]);

  socket.on('add', (message) => setRooms(...[message]));

  function enterRoom(room) {
    setUsername('admin');
    setRoomSecret(room);
    setIsCall(true);
  }

  function exitRoom() {
    setIsCall(false);
  }

  return (
    <div className="">
      <header>
        <h1>ADMINISTRAÇÃO</h1>
      </header>
      <main>
        <aside className="col-aside">
          <div className="sala-span sala-fake">
            <span >SALA - ATIVAS</span>
          </div>
        {
          rooms.length !== 0 && (
            rooms.map(({ room, members }, i) => 
              <div
                key={ `${room}-${i}` }
                onClick={ () => enterRoom(room) }
                className="card-room"
              >
                <div className="sala-span">
                  <span >SALA:</span>
                  <span>{ room }</span>
                </div>
                <div className="sala-span">
                  <span>MEMBROS:</span>
                  <span>{ members }</span>
                </div>
              </div>
            )
          )
        }
        </aside>
        <section>
          { 
            isCall ? (
              <div>
                <button
                  className="btn-sair"
                  onClick={ () => exitRoom() }
                >
                  SAIR
                </button>
                <ChatRoom />
              </div>
            ) : (
              <ChatRoomOff />
            )
          }
        </section>
      </main>
    </div>
  );
}

export default Admin;
