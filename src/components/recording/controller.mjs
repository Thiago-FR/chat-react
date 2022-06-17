export default class Controller {
  constructor({ view, media, recorder }) {
    this.view = view;
    this.media = media;
    this.recorder = recorder;
  }

  static initialize(dependencies) {
    const instance = new Controller(dependencies);

    return instance._init();
  }

  _init() {
    this.view.configureStartRecordingBtn(this.onStartRecording.bind(this));
    this.view.configureStopRecordingBtn(this.onStopRecording.bind(this));
    this.view.configureSendButton(this.onSendMessage.bind(this));
  }

  onSendMessage() {
    this.view.sendMessage(this.view.inputMessage.value);
    this.view.inputMessage.value = '';
  }

  async onStartRecording() {
    const audioStream = await this.media.getAudio();
    this.recorder.startRecording(audioStream);
  }

  async onStopRecording() {
    this.recorder.stopRecording();
    setTimeout(() => {
      const audioURL = this.recorder.getRecordURL();
      this.view.playAudio(audioURL);
    }, 1000);
  }
}