import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import HomePage from './pages/HomePage';
import DeckCreationPage from './pages/DeckCreationPage';
import DeckViewPage from './pages/DeckViewPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-profile" element={<ProfileCreationPage />} />
          <Route path="/home" element={<><Navbar /><HomePage /></>} />
          <Route path="/create-deck" element={<><Navbar /><DeckCreationPage /></>} />
          <Route path="/view-deck/:deckId" element={<><Navbar /><DeckViewPage /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
