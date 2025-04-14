import { useState, useEffect } from 'react';

function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [recorder, setRecorder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clean up function to stop recording when component unmounts
    return () => {
      if (recorder && recorder.state === 'recording') {
        recorder.stop();
      }
    };
  }, [recorder]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      });

      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError('Error accessing microphone: ' + err.message);
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
      
      // Stop all audio tracks to release the microphone
      recorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  return {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    error
  };
}

export default useAudioRecorder;