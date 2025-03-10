const buttonEl = document.getElementById('button');
const messageEl = document.getElementById('message');
const titleEl = document.getElementById('real-time-title');

messageEl.style.display = 'none';
let isRecording = false;
let socket;
let recorder;

const run = async () => {
  if (isRecording) { 
    if (socket) {
      socket.send(JSON.stringify({terminate_session: true}));
      socket.close();
      socket = null;
    }

    if (recorder) {
      recorder.pauseRecording();
      recorder = null;
    }
  } else {
    const response = await fetch('http://localhost:8000'); // get temp session token from server.js (backend)
    const data = await response.json();

    if(data.error){
      alert(data.error)
    }
    
    const { token } = data;

    // establish wss with AssemblyAI (AAI) at 16000 sample rate
    socket = await new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);

    // handle incoming messages to display transcription to the DOM
    const texts = {};
    socket.onmessage = (message) => {
      let msg = '';
      const res = JSON.parse(message.data);
      texts[res.audio_start] = res.text;
      const keys = Object.keys(texts);
      keys.sort((a, b) => a - b);
      for (const key of keys) {
        if (texts[key]) {
          msg += `${texts[key]}`;
        }
      }
      messageEl.innerText = msg;
    };

    socket.onerror = (event) => {
      console.error(event);
      socket.close();
    }
    
    socket.onclose = event => {
      console.log(event);
      socket = null;
    }

    socket.onopen = () => {
      // once socket is open, begin recording
      messageEl.style.display = '';
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          recorder = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm;codecs=pcm',
            recorderType: StereoAudioRecorder,
            timeSlice: 300, 
            desiredSampRate: 16000,
            numberOfAudioChannels: 1, 
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                const audioData = reader.result.split(',')[1]  

                if (socket) {
                  socket.send(JSON.stringify({ audio_data: audioData }));
                }
              };
              reader.readAsDataURL(blob);
            },
          });

          recorder.startRecording();
        })
        .catch((err) => console.error(err));
    };
  }

  isRecording = !isRecording;
  buttonEl.innerText = isRecording ? 'Stop' : 'Record';
  titleEl.innerText = isRecording ? 'Click stop to end recording!' : 'Click start to begin recording!'
};

buttonEl.addEventListener('click', () => run());
