import gsap from "gsap";

class AUDIO_CONTROLLER {
  setup() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();

    // console.log("setup log");
    this.audio = new Audio();
    this.audio.crossOrigin = "anonymous";

    this.audioSource = this.ctx.createMediaElementSource(this.audio);

    this.analyser = new AnalyserNode(this.ctx, {
      fftSize: 1024,
      smoothingTimeConstant: 0.8,
    });

    this.fdata = new Uint8Array(this.analyser.frequencyBinCount);

    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.analyser.getByteFrequencyData(this.fdata);

    gsap.ticker.add(this.tick);
  }

  updateSong(preview) {
    //console.log(preview);

    this.audio.src = preview;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  tick = () => {
    // console.log("tick");
    this.analyser.getByteFrequencyData(this.fdata);
    // console.log(this.fdata);
  };
}

const AudioController = new AUDIO_CONTROLLER();
export default AudioController;
