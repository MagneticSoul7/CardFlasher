import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // for navigation
import { getUserDecks, deleteDeck } from '../graphql/queries'; // Assuming these functions interact with your backend
import { useHistory } from 'react-router-dom';

const DeckList = () => {
  // State to hold the list of decks
  const [decks, setDecks] = useState([]);
  
  // For redirection after deleting deck
  const history = useHistory();

  // Fetch the user's decks from the backend
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await getUserDecks(); // Fetch decks using a GraphQL query or API call
        setDecks(response.data); // Update the state with the list of decks
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    };

    fetchDecks();
  }, []);

  // Handle deleting a deck
  const handleDeleteDeck = async (deckId) => {
    try {
      await deleteDeck(deckId); // Call the delete function (GraphQL mutation or API)
      setDecks(decks.filter(deck => deck.id !== deckId)); // Remove the deleted deck from the list
      history.push('/home'); // Redirect to home page after deleting
    } catch (error) {
      console.error('Error deleting deck:', error);
      alert('There was an error deleting the deck.');
    }
  };

  return (
    <div className="deck-list">
      <h1>Your Decks</h1>
      
      {/* Display a message if no decks are available */}
      {decks.length === 0 ? (
        <p>No Decks Yet. Create a new deck to get started!</p>
      ) : (
        <ul>
          {/* Render the list of decks */}
          {decks.map((deck) => (
            <li key={deck.id} className="deck-item">
              <div className="deck-info">
                {/* Deck title acts as a link to the deck page */}
                <Link to={`/deck/${deck.id}`} className="deck-title">
                  {deck.name}
                </Link>
              </div>

              <div className="deck-actions">
                {/* Edit button to go to deck creation page with existing data */}
                <Link to={`/edit-deck/${deck.id}`} className="edit-button">
                  Edit
                </Link>

                {/* Delete button */}
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteDeck(deck.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeckList;