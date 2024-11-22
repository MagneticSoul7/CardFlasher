import React from 'react';
import DeckList from './DeckList';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = ({ decks }) => {
  return (
    <div className="home-page">
      <h2>Your Decks</h2>
      <DeckList decks={decks} />
      <Link to="/create-deck">
        <button className="create-deck-button">Create New Deck</button>
      </Link>
    </div>
  );
};

export default HomePage;
