import { Link } from 'react-router-dom';

function SongHistoryItem({ song }) {
  return (
    <Link 
      to={`/analysis/${song.id}`}
      className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-50"
    >
      <img 
        src={song.coverUrl} 
        alt={`${song.title} album cover`}
        className="w-12 h-12 object-cover rounded mr-4"
      />
      
      <div className="flex-grow">
        <h3 className="font-medium">{song.title}</h3>
        <p className="text-sm text-gray-600">{song.artist}</p>
      </div>
      
      <div className="text-xs text-gray-500">
        {new Date(song.identifiedAt).toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </Link>
  );
}

export default SongHistoryItem;