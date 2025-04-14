import { useState, useEffect } from 'react';
import useAudioRecorder from '../hooks/useAudioRecorder';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';
import { analyzeAudio } from '../services/audioAnalysisService';

function AudioRecorder({ onRecordingComplete }) {
  const { isRecording, audioURL, startRecording, stopRecording, error } = useAudioRecorder();
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  useEffect(() => {
    if (audioURL && !isRecording) {
      handleAnalyzeAudio();
    }
  }, [audioURL, isRecording]);

  const handleAnalyzeAudio = async () => {
    setIsAnalyzing(true);
    
    try {
      // Convert the audioURL to a blob
      const response = await fetch(audioURL);
      const audioBlob = await response.blob();
      
      // Call the analysis service
      const result = await analyzeAudio(audioBlob);
      
      setIsAnalyzing(false);
      
      if (onRecordingComplete) {
        onRecordingComplete({
          audio: audioURL,
          duration: recordingDuration,
          analysisResult: result
        });
      }
    } catch (error) {
      console.error('Error analyzing audio:', error);
      setIsAnalyzing(false);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="relative">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isAnalyzing}
          className={`w-24 h-24 rounded-full flex items-center justify-center focus:outline-none ${
            isRecording 
              ? 'bg-red-500 animate-pulse' 
              : isAnalyzing 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isRecording ? (
            <StopIcon className="h-12 w-12 text-white" />
          ) : isAnalyzing ? (
            <div className="text-white font-medium">Analyzing...</div>
          ) : (
            <MicrophoneIcon className="h-12 w-12 text-white" />
          )}
        </button>
        
        {isRecording && (
          <div className="absolute -bottom-8 left-0 right-0 text-center">
            Recording: {formatDuration(recordingDuration)}
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        {isRecording ? (
          <p className="text-lg">Listening to music...</p>
        ) : isAnalyzing ? (
          <p className="text-lg">Analyzing audio...</p>
        ) : (
          <p className="text-lg">Tap the microphone to identify music</p>
        )}
      </div>
    </div>
  );
}

export default AudioRecorder;