function MoodAnalysis({ moodData = { energy: 0.8, valence: 0.7 } }) {
    const { energy, valence } = moodData;
    
    // Map energy (0-1) and valence (0-1) to mood descriptors
    const getMoodLabel = () => {
      if (energy > 0.6 && valence > 0.6) return "Happy, Energetic";
      if (energy > 0.6 && valence < 0.4) return "Angry, Intense";
      if (energy < 0.4 && valence > 0.6) return "Peaceful, Relaxed";
      if (energy < 0.4 && valence < 0.4) return "Sad, Depressing";
      return "Neutral";
    };
    
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium mb-3">Mood Analysis</h3>
        
        <div className="relative h-48 w-full border border-gray-200 rounded-lg mb-3">
          {/* Mood position indicator */}
          <div 
            className="absolute w-5 h-5 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${valence * 100}%`, 
              top: `${(1 - energy) * 100}%` 
            }}
          />
          
          {/* Quadrant labels */}
          <div className="absolute top-2 right-2 text-xs text-gray-500">Happy</div>
          <div className="absolute top-2 left-2 text-xs text-gray-500">Angry</div>
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">Peaceful</div>
          <div className="absolute bottom-2 left-2 text-xs text-gray-500">Sad</div>
          
          {/* Axis labels */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 text-xs text-gray-500 rotate-90">
            Energy
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 text-xs text-gray-500">
            Positivity
          </div>
        </div>
        
        <div className="text-center">
          <span className="text-lg font-medium">{getMoodLabel()}</span>
        </div>
      </div>
    );
  }
  
  export default MoodAnalysis;