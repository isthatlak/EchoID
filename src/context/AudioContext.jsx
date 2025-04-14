import { createContext, useContext, useReducer, useEffect } from 'react';
import { getSongHistory } from '../services/audioAnalysisService';

// Initial state
const initialState = {
  history: [],
  identifiedSongs: {},
  isLoading: false,
  error: null
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_HISTORY: 'SET_HISTORY',
  ADD_IDENTIFIED_SONG: 'ADD_IDENTIFIED_SONG',
  SET_IDENTIFIED_SONG: 'SET_IDENTIFIED_SONG'
};

// Reducer function
function audioReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ACTIONS.SET_HISTORY:
      return { ...state, history: action.payload, isLoading: false };
    case ACTIONS.ADD_IDENTIFIED_SONG:
      // Add to history and identifiedSongs
      return { 
        ...state, 
        history: [action.payload, ...state.history],
        identifiedSongs: {
          ...state.identifiedSongs,
          [action.payload.id]: {
            song: action.payload,
            analysis: action.payload.analysis
          }
        }
      };
    case ACTIONS.SET_IDENTIFIED_SONG:
      return { 
        ...state, 
        identifiedSongs: {
          ...state.identifiedSongs,
          [action.payload.song.id]: action.payload
        }
      };
    default:
      return state;
  }
}

// Create the context
const AudioContext = createContext();

// Context provider component
export function AudioProvider({ children }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  
  // Load history when component mounts
  useEffect(() => {
    const loadHistory = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        const history = await getSongHistory();
        dispatch({ type: ACTIONS.SET_HISTORY, payload: history });
      } catch (error) {
        console.error('Error loading history:', error);
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load history' });
      }
    };
    
    loadHistory();
  }, []);
  
  // Actions
  const addIdentifiedSong = (songData) => {
    dispatch({ 
      type: ACTIONS.ADD_IDENTIFIED_SONG, 
      payload: {
        ...songData.song,
        analysis: songData.analysis,
        identifiedAt: new Date().toISOString()
      }
    });
  };
  
  const setIdentifiedSong = (songData) => {
    dispatch({ type: ACTIONS.SET_IDENTIFIED_SONG, payload: songData });
  };
  
  // Value object to be provided
  const value = {
    ...state,
    addIdentifiedSong,
    setIdentifiedSong
  };
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

// Custom hook to use the audio context
export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}