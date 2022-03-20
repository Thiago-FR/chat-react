import React, { useContext, useEffect, useRef } from 'react';
import ChatContext from '../context/ChatContext';
import socketIOClient from "socket.io-client";
import ColorGenerator from '../js/ColorGenetaror'
import '../css/chatRoom.css';
const ENDPOINT = "http://localhost:3001";

function ChatRoom() {
  const { username, room } = useContext(ChatContext);

  const socket = socketIOClient(ENDPOINT);

  const inputMessage = useRef(null);

  useEffect(() => {
    socket.emit('joinRoom', { username, room, color: ColorGenerator() });
  }, []); 

  const createMessage = ({ message, className, username, color }) => {
    const messageUl = document.querySelector('#messages');
    const li = document.createElement('li');    
    const spanMessage = document.createElement('span');
    li.className = className;
    messageUl.appendChild(li);
    
    if (className === 'emit-room' || className === 'emit-me') {
      const spanUsername = document.createElement('span');
      spanUsername.className = 'message-username';
      spanUsername.innerText = username;
      spanUsername.style.color = color;
      messageUl.lastChild.appendChild(spanUsername);
    }

    spanMessage.innerText = message;
    messageUl.lastChild.appendChild(spanMessage);

    messageUl.scrollTop = messageUl.scrollHeight;
  };

  socket.on('serverMessage', (message) => createMessage(message));
  
  // ENVIO DE MENSAGEM

  const btnSend = (e) => {
    e.preventDefault();
    const message = inputMessage.current.value;
    socket.emit('roomClientMessage', { room, message, username });
    inputMessage.current.value = '';
    return false;
  };
  
  return (
    <div className="chat-body">
      <ul id="messages"></ul>
      <form className="chat-form">
        <input
          ref={ inputMessage }
          autoComplete="off"
          type="text"
        />
        <button
          className="btn-send"
          onClick={ (e) => btnSend(e)}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
