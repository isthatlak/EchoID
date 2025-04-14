import { useState, useEffect } from 'react';
import { Radar } from 'recharts';
import { 
  ResponsiveContainer,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis
} from 'recharts';

const GenreRadarChart = ({ genreData }) => {
  // Default data if none is provided
  const [data, setData] = useState([
    { genre: 'Pop', value: 0.8 },
    { genre: 'Rock', value: 0.4 },
    { genre: 'Electronic', value: 0.65 },
    { genre: 'Hip Hop', value: 0.3 },
    { genre: 'R&B', value: 0.5 }
  ]);
  
  useEffect(() => {
    if (genreData && genreData.length > 0) {
      setData(genreData);
    }
  }, [genreData]);
  
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="genre" />
          <PolarRadiusAxis angle={30} domain={[0, 1]} />
          <Radar
            name="Genre Confidence"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenreRadarChart;