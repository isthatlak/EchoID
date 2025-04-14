import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AnalysisPage from './pages/AnalysisPage';
import { AudioProvider } from './context/AudioContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  useEffect(() => {
    // Client-side error logging
    console.log("App loaded");
    
    // Add unhandled rejection handler
    const rejectionHandler = event => {
      console.error('Unhandled promise rejection:', event.reason);
    };
    
    window.addEventListener('unhandledrejection', rejectionHandler);
    
    return () => {
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  return (
    <ErrorBoundary>
      <AudioProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/analysis/:id" element={<AnalysisPage />} />
            </Routes>
          </div>
        </Router>
      </AudioProvider>
    </ErrorBoundary>
  );
}

export default App;