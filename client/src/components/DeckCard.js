import React from 'react';
import '../styles/DeckCard.css';

const DeckCard = ({ card, isFlipped, onFlip }) => {
  return (
    <div className="deck-card" onClick={onFlip}>
      {isFlipped ? card.back : card.front}
    </div>
  );
};

export default DeckCard;
