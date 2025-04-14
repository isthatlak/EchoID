// HomePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioRecorder from '../components/AudioRecorder';
import Navigation from '../components/Navigation';
import { useAudio } from '../context/AudioContext';

function HomePage() {
  //const [isIdentifying, setIsIdentifying] = useState(false);
  const navigate = useNavigate();
  const { addIdentifiedSong } = useAudio();

  const handleRecordingComplete = (recordingData) => {
    console.log('Recording data:', recordingData);
    setIsIdentifying(true);

    if (recordingData.analysisResult && recordingData.analysisResult.success) {
      const { songId, song, analysis } = recordingData.analysisResult;
      addIdentifiedSong({ song, analysis });
      setIsIdentifying(false);
      navigate(`/analysis/${songId}`);
    } else {
      setTimeout(() => {
        setIsIdentifying(false);
        alert('Unable to identify song. Please try again.');
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <Navigation />
      <AudioRecorder onRecordingComplete={handleRecordingComplete} />
    </div>
  );
}

export default HomePage;