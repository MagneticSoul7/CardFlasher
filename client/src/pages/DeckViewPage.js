import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_DECK } from '../graphql/queries';
import { shuffleArray } from '../utils/shuffle';
import '../styles/DeckViewPage.css';

const DeckViewPage = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_DECK, { variables: { deckId } });

  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Initialize cards state once data is loaded
  useEffect(() => {
    if (data && data.getDeck && data.getDeck.cards) {
      setCards(data.getDeck.cards);
    }
  }, [data]);

  if (loading) return <div>Loading deck...</div>;
  if (error) {
    console.error('Error loading deck:', error);
    return <div>Error loading deck!</div>;
  }

  const handleShuffle = () => {
    const shuffledCards = shuffleArray(cards);
    setCards(shuffledCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleDone = () => {
    navigate('/home');
  };

  return (
    <div className="deck-view-page">
      <div className="top-bar">
        <button className="shuffle-button" onClick={handleShuffle}>
          Shuffle
        </button>
        <button className="done-button" onClick={handleDone}>
          Done
        </button>
      </div>
      <h2>{data.getDeck.title}</h2>
      <div className="card-container">
        {cards.length > 0 && (
          <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-front">{cards[currentCardIndex].front}</div>
            <div className="card-back">{cards[currentCardIndex].back}</div>
          </div>
        )}
        <div className="card-controls">
          {currentCardIndex > 0 && (
            <button className="previous-button" onClick={handlePrevious}>
              Previous
            </button>
          )}
          <button className="flip-button" onClick={handleFlip}>
            Flip
          </button>
          {currentCardIndex < cards.length - 1 && (
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeckViewPage;
