// HistoryPage.jsx
import { useAudio } from '../context/AudioContext';
import SongHistoryItem from '../components/SongHistoryItem';
import Navigation from '../components/Navigation';

function HistoryPage() {
  const { history, isLoading } = useAudio();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pb-20">
      <Navigation />
      <h2 className="text-xl font-semibold mb-4">History</h2>
      {history.map((song, index) => (
        <SongHistoryItem key={index} song={song} />
      ))}
    </div>
  );
}

export default HistoryPage;