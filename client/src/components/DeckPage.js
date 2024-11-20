import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // For getting the deck id from URL and redirecting
import { getDeck, shuffleDeck } from '../graphql/queries'; // Assume these are the GraphQL queries to get and shuffle the deck
import PropTypes from 'prop-types'; // For prop type validation

const DeckPage = () => {
  const { deckId } = useParams(); // Get the deckId from URL
  const history = useHistory();
  const [deck, setDeck] = useState(null); // State to store deck data
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // State to track the current card index
  const [isFlipped, setIsFlipped] = useState(false); // State to track whether the card is flipped

  // Fetch the deck by its ID when the component mounts
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const fetchedDeck = await getDeck(deckId); // Fetch the deck data from the database
        setDeck(fetchedDeck);
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };
    
    fetchDeck();
  }, [deckId]);

  // Handle shuffling the deck
  const handleShuffle = () => {
    setCurrentCardIndex(0); // Reset to the first card after shuffle
    shuffleDeck(deckId); // Shuffle the deck via a GraphQL mutation or some logic
  };

  // Handle flipping the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Toggle the flip state
  };

  // Handle navigating to the next card
  const handleNext = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false); // Reset the flip state when moving to the next card
    }
  };

  // Handle navigating to the previous card
  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false); // Reset the flip state when moving to the previous card
    }
  };

  // Return to the home page
  const handleReturnHome = () => {
    history.push('/home');
  };

  // Ensure deck is loaded before rendering
  if (!deck) {
    return <div>Loading...</div>;
  }

  const currentCard = deck.cards[currentCardIndex];

  return (
    <div className="deck-page">
      {/* Deck Title */}
      <h1>{deck.name}</h1>
      
      {/* Card display */}
      <div className="card-container">
        <div className="card">
          <div className="card-side front">
            {currentCard && !isFlipped ? currentCard.front : null}
          </div>
          <div className="card-side back">
            {currentCard && isFlipped ? currentCard.back : null}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button onClick={handleReturnHome} className="return-home">
          Return to Home
        </button>
        <button onClick={handleShuffle} className="shuffle-button">
          Shuffle
        </button>

        {/* Previous Button (only after the first card) */}
        {currentCardIndex > 0 && (
          <button onClick={handlePrevious} className="previous-button">
            Previous
          </button>
        )}

        {/* Flip Button */}
        <button onClick={handleFlip} className="flip-button">
          Flip
        </button>

        {/* Next Button (only before the last card) */}
        {currentCardIndex < deck.cards.length - 1 && (
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

// Prop Types for validation
DeckPage.propTypes = {
  deckId: PropTypes.string.isRequired,
};

export default DeckPage;