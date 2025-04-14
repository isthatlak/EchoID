import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioRecorder from '../components/AudioRecorder';
import Navigation from '../components/Navigation';
import { useAudio } from '../context/AudioContext';

function HomePage() {
  const [isIdentifying, setIsIdentifying] = useState(false);
  const navigate = useNavigate();
  const { addIdentifiedSong } = useAudio();

  const handleRecordingComplete = (recordingData) => {
    console.log('Recording data:', recordingData);
    setIsIdentifying(true);
    
    // If we have analysis results, navigate to the analysis page
    if (recordingData.analysisResult && recordingData.analysisResult.success) {
      const { songId, song, analysis } = recordingData.analysisResult;
      
      // Add to global state
      addIdentifiedSong({ song, analysis });
      
      setIsIdentifying(false);
      navigate(`/analysis/${songId}`);
    } else {
      // If analysis failed, show an error message
      setTimeout(() => {
        setIsIdentifying(false);
        // You could show an error message here
      }, 1000);
    }
  };

  // Rest of the component remains the same
  return (
    <div className="container mx-auto p-4 pb-20">
      {/* Same JSX as before */}
    </div>
  );
}

export default HomePage;