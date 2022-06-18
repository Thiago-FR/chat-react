import React, { useContext, useEffect, useRef } from 'react';
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
import '../css/btnAudio.css';


const ENDPOINT = process.env.REACT_APP_HOST;

function ChatRoom() {
  const { username, room } = useContext(ChatContext);
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

  const btnSend = (e) => {
    e.preventDefault();
  };
  
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
            id="btnStart"
            ref={ buttonStart }
            className=""
            onClick={ (e) => btnSend(e)}
          >
          </button>
          <button
            id="btnStop"
            ref={ buttonStop }
            className="hidden"
            onClick={ (e) => btnSend(e)}
          >
            <span className="btn-stop-span flash-red"></span>
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
