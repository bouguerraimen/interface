import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import io from 'socket.io-client';
import './Dictaphone.css';
import mic from './assets/mic.png'; // si le fichier est à src/assets/mic.jpg


const socket = io('http://localhost:5000');

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Envoi des commandes au serveur Flask
  const sendCommandToFlask = (command) => {
    console.log("Envoi de la commande au serveur Flask :", command);
    socket.emit('send_command', { command });
  };

  // Détection du mot-clé "bottle"
  useEffect(() => {
    if (transcript.toLowerCase().includes('bottle')) {
      sendCommandToFlask("bottle");
      resetTranscript();
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Votre navigateur ne supporte pas la reconnaissance vocale.</span>;
  }
return (
  <div className='vocal'>
    <div className='h'>
         <img src={mic} alt="Microphone"  width={150} height={150}/>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      </div>    
    <button onClick={SpeechRecognition.startListening}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p>Transcript: {transcript}</p>
  </div>
);

};

export default Dictaphone;