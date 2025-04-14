// AnalysisPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { getSongAnalysis } from '../services/audioAnalysisService';
import SongInfo from '../components/SongInfo';
import WaveformVisualizer from '../components/WaveformVisualizer';
import GenreRadarChart from '../components/GenreRadarChart';
import MoodAnalysis from '../components/MoodAnalysis';
import Navigation from '../components/Navigation';

function AnalysisPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { identifiedSongs, setIdentifiedSong } = useAudio();
  const songData = identifiedSongs[id];

  useEffect(() => {
    const fetchSongData = async () => {
      if (!songData) {
        try {
          const result = await getSongAnalysis(id);
          setIdentifiedSong(result);
        } catch (error) {
          console.error('Error fetching song data:', error);
        }
      }
      setIsLoading(false);
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

  return (
    <div className="container mx-auto p-4 pb-20">
      <Navigation />
      <SongInfo song={song} />
      <WaveformVisualizer audioURL={song.audio} />
      <GenreRadarChart genreData={analysis.genres} />
      <MoodAnalysis moodData={analysis.moods} />
    </div>
  );
}

export default AnalysisPage;