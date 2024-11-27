import React, { useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_DECKS } from '../graphql/queries';
import { DELETE_DECK } from '../graphql/mutations';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import authService from '../utils/Auth';


const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.loggedIn()) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const { loading, error, data, refetch } = useQuery(GET_DECKS);
  const [deleteDeck] = useMutation(DELETE_DECK);

  const handleRemove = async (deckId) => {
    try {
      const { data } = await deleteDeck({ variables: { deckId } });
      console.log('Deleted Deck:', data.deleteDeck);
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
      {/* Left side: Decks list */}
      <div className="decks-container">
        {decks.length === 0 ? (
          <p className="no-decks">No decks yet. Create one to get started!</p>
        ) : (
          decks.map((deck) => (
            <div key={deck._id} className="deck-item">
              <Link to={`/viewDeck/${deck._id}`} className="deck-title">
                {deck.title}
              </Link>
              <button
                className="delete-button"
                onClick={() => handleRemove(deck._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Right side: Create New Deck button */}
      <div className="create-deck-button-container">
        <Link to="/createDeck">
          <button className="create-deck-button">Create New Deck</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
