import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_DECK } from './queries'; // Import the query to fetch deck data

const DeckViewPage = () => {
  const { state } = useLocation(); // Get deck info passed via navigation (from DeckList or elsewhere)
  const { id } = state; // Assuming the deck ID is passed through navigation state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const { loading, error, data } = useQuery(GET_DECK, { variables: { id } });
  const history = useHistory();

  useEffect(() => {
    if (data) {
      // Shuffle the deck when it is fetched
      const shuffledCards = shuffleDeck(data.getDeck.cards);
      setShuffledDeck(shuffledCards);
    }
  }, [data]);

  const shuffleDeck = (cards) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleNext = () => {
    if (currentCardIndex < shuffledDeck.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleShuffle = () => {
    const shuffledCards = shuffleDeck(data.getDeck.cards);
    setShuffledDeck(shuffledCards);
    setCurrentCardIndex(0); // Reset to the first card after shuffling
  };

  const handleFlip = () => {
    // You can add logic here if you want to manage the "flipping" behavior
    // For now, it's assumed to be handled automatically when the card text changes
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const currentCard = shuffledDeck[currentCardIndex];

  return (
    <div className="deck-view-page">
      <h1>{data.getDeck.name}</h1> {/* Display deck name */}

      <div className="card-container">
        <div className="card">
          <h2>{currentCard.front}</h2> {/* Display the front of the card */}
        </div>

        <div className="card-buttons">
          <button onClick={handlePrevious} disabled={currentCardIndex === 0}>
            Previous
          </button>
          <button onClick={handleFlip}>Flip</button>
          <button
            onClick={handleNext}
            disabled={currentCardIndex === shuffledDeck.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <div className="deck-controls">
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={() => history.push('/home')}>Return to Home</button>
      </div>
    </div>
  );
};

export default DeckViewPage;