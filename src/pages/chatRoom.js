import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import ChatContext from '../context/ChatContext';
import socketIOClient from "socket.io-client";
import ColorGenerator from '../js/ColorGenetaror'
import View from '../components/recording/view.mjs';
import Controller from '../components/recording/controller.mjs';
import Media from '../components/recording/util/media.mjs';
import Recorder from '../components/recording/util/recorder.mjs';
import '../css/chatRoom.css';
import '../css/chatRoom-600px.css'
import '../css/record.css'


const ENDPOINT = process.env.REACT_APP_HOST;

function ChatRoom() {
  const { username, room } = useContext(ChatContext);
  const [btnStart, setBtnStart] = useState(false);
  const history = useHistory();

  const socket = socketIOClient(ENDPOINT);

  const inputMessage = useRef(null);
  const buttonSend = useRef(null);
  const buttonStart = useRef(null);
  const buttonStop = useRef(null);

  useEffect(() => {
    if (!checkLogin()) return history.push('/');
    socket.emit('joinRoom', { username, room, color: ColorGenerator() });

    const view = new View(
      buttonStart.current,
      buttonStop.current,
      buttonSend.current,
      inputMessage.current,
      socket,
      username,
      room,
    );
    const media = new Media();
    const recorder = new Recorder();

    Controller.initialize({ view, media, recorder });
  }, []);

  const checkLogin = () => {
    const numMin = 3;
    if (username.length < numMin || room.length < numMin) {
      localStorage.setItem('room', JSON.stringify({ room: false }));
      return false;
    };
    localStorage.clear();
    return true;
  }

  // ENVIO DE MENSAGEM

  const btnSend = (e) => {
    e.preventDefault();
  };

  const btnRecord = (e) => {
    e.preventDefault();
    setBtnStart(!btnStart);
  }
  
  return (
    <div className="chat-body">
      <ul id="messages"></ul>
      <form className="chat-form">
        <div className="input-and-btn-record">
          <input
            ref={ inputMessage }
            autoComplete="off"
            type="text"
          />
          <button
            ref={ buttonStart }
            className=""
            onClick={ (e) => btnRecord(e)}
          >
            Start
          </button>
          <button
            ref={ buttonStop }
            className="hidden"
            onClick={ (e) => btnRecord(e)}
          >
            Stop
          </button>
        </div>
        <button
          ref={ buttonSend }
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
