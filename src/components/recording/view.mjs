export default class View {
  constructor(btnStart, btnStop, buttonSend, inputMessage, socket, username, room) {
    this.btnStart = btnStart;
    this.btnStop = btnStop;
    this.socket = socket;
    this.username = username;
    this.room = room;
    this.inputMessage = inputMessage;
    this.buttonSend = buttonSend;
    this.audioType = 'audio/webm;codecs=opus';
    this.configSocketIo();

    this.podcastAudio = null;
    this.playBtn = null;
    this.pauseBtn = null;
    this.playerCtrl = null;
  }

  // Play audio & mostra pause btn
  playShow() {
    this.podcastAudio = document.getElementById('podcast-audio');
    this.playBtn = document.getElementById('podcast-play');
    this.pauseBtn = document.getElementById('podcast-pause');
    this.playerCtrl = document.querySelector('.player-ctrl');
    this.playerCtrl.classList.add('audioTrue');
    this.podcastAudio.play();
    this.playBtn.style.display = 'none';
    this.pauseBtn.style.display = 'inline-block';
  };

  // Pause audio & mostra play btn
  pauseShow() {
    this.playerCtrl.classList.remove('audioTrue');
    this.podcastAudio.pause();
    this.playBtn.style.display = 'inline-block';
    this.pauseBtn.style.display = 'none';
  };

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
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css';
      
      const iconPlay = document.createElement('i');
      const iconPause = document.createElement('i');
      iconPlay.classList.add('ion-ios-play');
      iconPause.classList.add('ion-ios-pause');

      const linkPlay = document.createElement('a');
      const linkPause = document.createElement('a');
      linkPlay.id = 'podcast-play';
      linkPlay.addEventListener('click', () => this.playShow());
      linkPlay.appendChild(iconPlay);

      linkPause.id = 'podcast-pause';
      linkPause.addEventListener('click', () => this.pauseShow());
      linkPause.appendChild(iconPause);
      linkPause.style.display = 'none';

      const div = document.createElement('div');
      div.classList.add('player-ctrl');
      div.appendChild(linkPlay);
      div.appendChild(linkPause);

      const blob = new Blob([message], { type: this.audioType } )
      const audio = document.createElement('audio');
      audio.id = 'podcast-audio';
      audio.controls = true;
      audio.src = window.URL.createObjectURL(blob);
      audio.muted = false;
      audio.autoplay = false;
      audio.innerText = 'Seu Navegado não suporta a tag <code>audio</code>';
      li.appendChild(link);
      li.appendChild(div);
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




