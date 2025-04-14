// This is a mock service that simulates audio analysis
// In a real app, this would call a backend API with ML models

// Function to simulate sending audio to a server for analysis
export const analyzeAudio = async (audioBlob) => {
    console.log('Analyzing audio...', audioBlob);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock analysis results
    return {
      success: true,
      songId: '123',
      song: {
        id: '123',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        coverUrl: 'https://via.placeholder.com/300/3498db/ffffff?text=Album+Cover',
        year: '2020',
        duration: '3:22',
      },
      analysis: {
        bpm: 171,
        key: 'F minor',
        instruments: ['Synthesizer', 'Drums', 'Vocals'],
        genre: [
          { genre: 'Synth-pop', value: 0.85 },
          { genre: 'New Wave', value: 0.65 },
          { genre: 'Dance-pop', value: 0.55 },
          { genre: 'R&B', value: 0.35 },
          { genre: 'Electronic', value: 0.70 },
        ],
        mood: {
          energy: 0.8,
          valence: 0.65,
        },
      },
    };
  };
  
  // Function to get song history
  export const getSongHistory = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock history data
    return [
      {
        id: '123',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        coverUrl: 'https://via.placeholder.com/300/3498db/ffffff?text=Album+Cover',
        identifiedAt: new Date(Date.now() - 20 * 60000).toISOString(),
      },
      {
        id: '456',
        title: 'Bad Guy',
        artist: 'Billie Eilish',
        coverUrl: 'https://via.placeholder.com/300/27ae60/ffffff?text=Album+Cover',
        identifiedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      },
      // Add more mock history items as needed
    ];
  };
  
  // Function to get detailed song analysis by ID
  export const getSongAnalysis = async (songId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock data for the requested song
    return {
      song: {
        id: songId,
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        coverUrl: 'https://via.placeholder.com/300/3498db/ffffff?text=Album+Cover',
        year: '2020',
        duration: '3:22',
        audioUrl: 'https://example.com/audio.mp3',
      },
      analysis: {
        bpm: 171,
        key: 'F minor',
        instruments: ['Synthesizer', 'Drums', 'Vocals'],
        genre: [
          { genre: 'Synth-pop', value: 0.85 },
          { genre: 'New Wave', value: 0.65 },
          { genre: 'Dance-pop', value: 0.55 },
          { genre: 'R&B', value: 0.35 },
          { genre: 'Electronic', value: 0.70 },
        ],
        mood: {
          energy: 0.8,
          valence: 0.65,
        },
      },
    };
  };