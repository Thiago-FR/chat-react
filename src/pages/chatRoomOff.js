import React from 'react';
import '../css/chatRoom.css';
import '../css/chatRoom-600px.css'
import '../css/record.css'
import '../css/btnAudio.css';
import '../css/admin.css';

function ChatRoomOff() {  
  return (
    <div className="chat-body color-off">
      <ul id="messages"></ul>
      <form className="chat-form">
        <div className="input-and-btn-record">
          <input
            autoComplete="off"
            type="text"
            disabled
          />
          <button
            id="btnStart"
            className="cursor-off"
            disabled
          >
          </button>
        </div>
        <button
          className="btn-send cursor-off"
          disabled
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoomOff;
