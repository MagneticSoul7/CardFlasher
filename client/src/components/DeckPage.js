import React, { useState } from 'react';
import DeckCard from './DeckCard';
import '../styles/DeckPage.css';

const DeckPage = ({ deck }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => setIsFlipped(!isFlipped);

  const currentCard = deck.cards[currentIndex];

  return (
    <div className="deck-page">
      <h2>{deck.title}</h2>
      <DeckCard card={currentCard} isFlipped={isFlipped} onFlip={handleFlip} />
      <div className="controls">
        {currentIndex > 0 && <button onClick={handlePrevious}>Previous</button>}
        <button onClick={handleFlip}>Flip</button>
        {currentIndex < deck.cards.length - 1 && <button onClick={handleNext}>Next</button>}
      </div>
    </div>
  );
};

export default DeckPage;
