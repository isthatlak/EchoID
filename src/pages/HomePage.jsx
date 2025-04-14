import { useNavigate } from 'react-router-dom';
import AudioRecorder from '../components/AudioRecorder';
import Navigation from '../components/Navigation';
import { useAudio } from '../context/AudioContext';

function HomePage() {
  const navigate = useNavigate();
  const { addIdentifiedSong } = useAudio();

  const handleRecordingComplete = (recordingData) => {
    console.log('Recording data:', recordingData);

    if (recordingData.analysisResult && recordingData.analysisResult.success) {
      const { songId, song, analysis } = recordingData.analysisResult;
      addIdentifiedSong({ song, analysis });
      navigate(`/analysis/${songId}`);
    } else {
      setTimeout(() => {
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