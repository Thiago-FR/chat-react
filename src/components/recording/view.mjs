export default class View {
  constructor(btnStart, btnStop, buttonSend, inputMessage, socket, username, room) {
    this.btnStart = btnStart;
    this.btnStop = btnStop;
    this.socket = socket;
    this.username = username;
    this.room = room;
    this.inputMessage = inputMessage;
    this.buttonSend = buttonSend;
    this.configSocketIo();
  }

  createMessage({ message, className, username, color, isAudio }) {
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
    if (!isAudio) {
      spanMessage.innerText = message;
      messageUl.lastChild.appendChild(spanMessage);
    } else {
      console.log(message);
      const blob = new Blob(message, { type: 'audio/webm;codecs=opus' } )
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = window.URL.createObjectURL(blob);
      audio.muted = false;
      audio.autoplay = false;
      audio.innerText = 'Seu Navegado não suporta a tag <code>audio</code>';
      li.appendChild(audio);
    }

    messageUl.scrollTop = messageUl.scrollHeight;
  };

  configSocketIo() {
    this.socket.on('serverMessage', (message) => this.createMessage(message));
  }

  socketEmit(message, isAudio) {
    this.socket.emit('roomClientMessage', {
      room: this.room,
      message,
      username: this.username,
      isAudio,
    });
  }

  onSendClick(command) {
    return () => {
      command();
    };
  }

  onRecordClick(command) {
    return () => {
      command();
      this.toggleButtonRecording(this.btnStart, { visible: true });
      this.toggleButtonRecording(this.btnStop, { visible: false });
    };
  }

  onStopRecordingClick(command) {
    return () => {
      command();
      this.toggleButtonRecording(this.btnStart, { visible: false });
      this.toggleButtonRecording(this.btnStop, { visible: true });
    };
  }

  configureSendButton(command) {
    this.buttonSend.addEventListener('click', this.onSendClick(command));
  }

  configureStartRecordingBtn(command) {
    this.btnStart.addEventListener('click', this.onRecordClick(command));
  }

  configureStopRecordingBtn(command) {
    this.btnStop.addEventListener('click', this.onStopRecordingClick(command));
  }

  toggleButtonRecording(btn, { visible }) {
    const classList = btn.classList;
    visible ? classList.add('hidden') : classList.remove('hidden');
  }

  playAudio(url) {
    this.socketEmit(url, true);
    this.toggleButtonRecording(this.btnStart, { visible: false })
  }

  sendMessage(message) {
    this.socketEmit(message, false);
  }
}




