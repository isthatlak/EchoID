import { useAudio } from '../context/AudioContext';
import SongHistoryItem from '../components/SongHistoryItem';
import Navigation from '../components/Navigation';

function HistoryPage() {
  const { history, isLoading } = useAudio();
  
  // Group songs by day function remains the same
  const groupSongsByDay = () => {
    const groups = {};
    
    history.forEach(song => {
      // Same grouping logic as before
    });
    
    return groups;
  };
  
  //const groupedHistory = groupSongsByDay();
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4">Loading history...</p>
      </div>
    );
  }
  
  // Rest of the component remains the same
  return (
    <div className="container mx-auto p-4 pb-20">
      {/* Same JSX as before, but using the history from context */}
    </div>
  );
}

export default HistoryPage;