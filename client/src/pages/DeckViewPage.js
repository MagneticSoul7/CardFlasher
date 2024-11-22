import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DECK } from '../graphql/queries';
import { shuffleArray } from '../utils/shuffle';
import { useParams } from 'react-router-dom';
import '../styles/DeckPage.css';

const DeckViewPage = () => {
  const { deckId } = useParams();
  const { loading, error, data } = useQuery(GET_DECK, { variables: { deckId } });
  const [shuffledCards, setShuffledCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (data && data.getDeck) {
      const cardsWithFlipped = data.getDeck.cards.map((card) => ({
        ...card,
        flipped: false, // Ensure every card has a `flipped` property
      }));
      setShuffledCards(shuffleArray(cardsWithFlipped));
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('Error loading deck:', error);
    return <div>Error loading deck!</div>;
  }

  const handleShuffle = () => {
    setShuffledCards(shuffleArray(shuffledCards));
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    const updatedCards = [...shuffledCards];
    updatedCards[currentIndex].flipped = !updatedCards[currentIndex].flipped;
    setShuffledCards(updatedCards);
  };

  const currentCard = shuffledCards[currentIndex];

  return (
    <div className="deck-view-page">
      <h2>{data.getDeck.title}</h2>
      <div className="card-container">
        {currentCard ? (currentCard.flipped ? currentCard.back : currentCard.front) : 'No cards available'}
      </div>
      <div className="controls">
        {currentIndex > 0 && <button onClick={handlePrevious}>Previous</button>}
        <button onClick={handleFlip}>Flip</button>
        {currentIndex < shuffledCards.length - 1 && <button onClick={handleNext}>Next</button>}
      </div>
      <button onClick={handleShuffle} className="shuffle-button">Shuffle</button>
    </div>
  );
};

export default DeckViewPage;
