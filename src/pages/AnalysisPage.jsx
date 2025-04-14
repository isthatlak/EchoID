import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { getSongAnalysis } from '../services/audioAnalysisService';
import SongInfo from '../components/SongInfo';
import WaveformVisualizer from '../components/WaveformVisualizer';
import GenreRadarChart from '../components/GenreRadarChart';
import MoodAnalysis from '../components/MoodAnalysis';
import Navigation from '../components/Navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function AnalysisPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { identifiedSongs, setIdentifiedSong } = useAudio();
  
  // Get the song data from context or fetch it if not available
  const songData = identifiedSongs[id];
  
  useEffect(() => {
    const fetchSongData = async () => {
      if (!songData) {
        try {
          const result = await getSongAnalysis(id);
          setIdentifiedSong(result);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching song data:', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchSongData();
  }, [id, songData, setIdentifiedSong]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading analysis...</p>
      </div>
    );
  }
  
  const { song, analysis } = songData || {};
  
  // Rest of the component remains the same, but using song and analysis from context
  return (
    <div className="container mx-auto p-4 pb-20">
      {/* Same JSX as before */}
    </div>
  );
}

export default AnalysisPage;