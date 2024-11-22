import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DECKS } from '../graphql/queries';
import { DELETE_DECK } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const { loading, error, data, refetch } = useQuery(GET_DECKS);
  const [deleteDeck] = useMutation(DELETE_DECK);

  const handleRemove = async (deckId) => {
    try {
      const response = await deleteDeck({ variables: { deckId } });
      console.log('Deleted Deck:', response.data.deleteDeck);
      refetch(); // Refresh the deck list after deletion
    } catch (err) {
      console.error('Error deleting deck:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('Error loading decks:', error);
    return <div>Error loading decks!</div>;
  }

  const decks = data.getDecks || [];

  return (
    <div className="home-page">
      <h2>Welcome to CardFlasher!</h2>
      <div className="decks-container">
        {decks.length === 0 ? (
          <p className="no-decks">No decks yet. Create one to get started!</p>
        ) : (
          decks.map((deck) => (
            <div key={deck._id} className="deck-item">
              <Link to={`/view-deck/${deck._id}`} className="deck-title">
                {deck.title}
              </Link>
              <div className="deck-actions">
                <button className="edit-button">
                  <Link to={`/create-deck?deckId=${deck._id}`}>Edit</Link>
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleRemove(deck._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Link to="/create-deck">
        <button className="create-deck-button">Create New Deck</button>
      </Link>
    </div>
  );
};

export default HomePage;
