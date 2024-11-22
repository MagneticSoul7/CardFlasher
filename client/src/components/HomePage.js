import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // For redirecting to other pages
import { getUserDecks, deleteDeck } from '../graphql/queries'; // Assuming these are GraphQL queries to get the user's decks and delete a deck
import DeckCard from './DeckCard'; // A child component that renders individual deck information

const HomePage = () => {
  const [decks, setDecks] = useState([]); // State to hold the list of user decks
  const [loading, setLoading] = useState(true); // Loading state while fetching decks
  const history = useHistory();

  // Fetch decks when the page loads
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const userDecks = await getUserDecks(); // Fetch the user's decks from the server or database
        setDecks(userDecks);
      } catch (error) {
        console.error('Error fetching decks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDecks();
  }, []);

  // Handle creating a new deck (navigate to DeckCreationPage)
  const handleCreateDeck = () => {
    history.push('/create-deck'); // Navigate to the deck creation page
  };

  // Handle removing a deck
  const handleRemoveDeck = async (deckId) => {
    try {
      await deleteDeck(deckId); // Delete the deck via GraphQL or other API
      setDecks(decks.filter(deck => deck.id !== deckId)); // Remove the deleted deck from the list
    } catch (error) {
      console.error('Error deleting deck:', error);
    }
  };

  return (
    <div className="home-page">
      <h1>Your Flashcard Decks</h1>

      {/* Create New Deck Button */}
      <button onClick={handleCreateDeck} className="create-deck-button">
        Create New Deck of Flash Cards
      </button>

      {/* Decks List */}
      <div className="deck-list">
        {loading ? (
          <div>Loading decks...</div> // Loading indicator
        ) : (
          decks.length > 0 ? (
            decks.map(deck => (
              <DeckCard
                key={deck.id}
                deck={deck}
                onRemoveDeck={handleRemoveDeck}
              />
            ))
          ) : (
            <p>No Decks Yet</p> // Placeholder message when no decks are available
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;