import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import HomePage from './pages/HomePage';
import DeckCreationPage from './pages/DeckCreationPage';
import DeckViewPage from './pages/DeckViewPage';
import './styles/App.css';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
