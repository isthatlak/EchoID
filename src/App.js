import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AnalysisPage from './pages/AnalysisPage';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
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
  );
}

export default App;