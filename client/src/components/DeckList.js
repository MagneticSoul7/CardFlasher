import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DeckList.css';

const DeckList = ({ decks }) => {
  return (
    <div className="deck-list">
      {decks.length === 0 ? (
        <p>No decks available</p>
      ) : (
        decks.map((deck) => (
          <div key={deck._id} className="deck-item">
            <Link to={`/view-deck/${deck._id}`} className="deck-title">
              {deck.title}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default DeckList;
