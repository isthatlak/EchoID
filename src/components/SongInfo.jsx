function SongInfo({ song }) {
    const defaultSong = {
      title: "Unknown Song",
      artist: "Unknown Artist",
      album: "Unknown Album",
      coverUrl: "https://via.placeholder.com/300",
      year: "Unknown",
      duration: "0:00",
    };
    
    const songData = song || defaultSong;
    
    return (
      <div className="flex flex-col items-center p-4">
        <img 
          src={songData.coverUrl} 
          alt={`${songData.title} album cover`} 
          className="w-48 h-48 object-cover rounded-lg shadow-lg mb-4"
        />
        
        <div className="text-center mt-2">
          <h2 className="text-xl font-bold">{songData.title}</h2>
          <p className="text-gray-700">{songData.artist}</p>
          <p className="text-gray-500 text-sm">{songData.album} • {songData.year}</p>
        </div>
        
        <div className="flex gap-4 mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Listen
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    );
  }
  
  export default SongInfo;