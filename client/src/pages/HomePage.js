import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_DECKS } from './queries'; // Assuming you have a query to fetch user decks

const HomePage = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_USER_DECKS); // Query to get all decks of the current user

  // Handle navigating to deck view page
  const handleDeckClick = (deckId) => {
    history.push({
      pathname: `/deck/${deckId}`,
      state: { id: deckId }, // Passing deck ID through location state
    });
  };

  // Handle creating a new deck
  const handleCreateDeck = () => {
    history.push('/create-deck'); // Redirect to deck creation page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-page">
      <div className="navbar">
        {/* You can create a navbar component or include it directly */}
        <h2>Welcome to Flashcards!</h2>
        <nav>
          <button onClick={() => history.push('/home')}>Home</button>
          <button onClick={() => history.push('/contact')}>Contact</button>
          <button onClick={() => history.push('/about')}>About</button>
        </nav>
      </div>

      <div className="deck-list">
        <h3>Your Decks</h3>
        {/* If the user has no decks */}
        {data.getUserDecks.length === 0 ? (
          <p>No Decks Yet</p>
        ) : (
          <ul>
            {data.getUserDecks.map((deck) => (
              <li key={deck.id} className="deck-item">
                <span
                  className="deck-title"
                  onClick={() => handleDeckClick(deck.id)} // Navigate to the deck page
                >
                  {deck.name}
                </span>
                <div className="deck-actions">
                  {/* Button to edit a deck */}
                  <button onClick={() => history.push(`/edit-deck/${deck.id}`)}>Edit</button>
                  {/* Button to remove a deck */}
                  <button>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="create-deck">
        <button onClick={handleCreateDeck}>Create New Deck of Flashcards</button>
      </div>
    </div>
  );
};

export default HomePage;