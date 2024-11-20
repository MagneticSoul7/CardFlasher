import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { useHistory } from 'react-router-dom'; // For redirecting
import { deleteDeck } from '../graphql/queries'; // Assume this is the function for deleting a deck
import PropTypes from 'prop-types'; // For type-checking props

const DeckCard = ({ deck }) => {
  const history = useHistory();

  // Handle deck deletion
  const handleDelete = async () => {
    try {
      await deleteDeck(deck.id); // Delete the deck by ID
      history.push('/home'); // Redirect to home after deletion
    } catch (error) {
      console.error('Error deleting deck:', error);
      alert('There was an error deleting the deck.');
    }
  };

  return (
    <div className="deck-card">
      <div className="deck-info">
        {/* Deck title as a link to the deck page */}
        <Link to={`/deck/${deck.id}`} className="deck-title">
          {deck.name}
        </Link>
      </div>

      <div className="deck-actions">
        {/* Edit button */}
        <Link to={`/edit-deck/${deck.id}`} className="edit-button">
          Edit
        </Link>

        {/* Delete button */}
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

// Prop Types for validation
DeckCard.propTypes = {
  deck: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeckCard;