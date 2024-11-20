import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // for redirection after deck is created
import { createDeck } from '../graphql/mutations'; // Assuming you have this mutation for backend interaction

const CreateDeck = () => {
  // State for deck name and card data
  const [deckName, setDeckName] = useState('');
  const [cards, setCards] = useState([{ front: '', back: '' }]);

  // Redirect to home after saving deck
  const history = useHistory();

  // Handle changes to card fields
  const handleCardChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  // Add a new card
  const addCard = () => {
    setCards([...cards, { front: '', back: '' }]);
  };

  // Remove the most recently added card (but can't remove the last one)
  const removeCard = () => {
    if (cards.length > 1) {
      setCards(cards.slice(0, -1));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure deck name and at least one card are present
    if (!deckName || cards.some(card => !card.front || !card.back)) {
      alert('Please fill out all fields for the deck and cards.');
      return;
    }

    // Data to be sent to backend
    const deckData = {
      name: deckName,
      cards: cards,
    };

    // Send the deck data to the backend (you can replace this with an API call)
    try {
      await createDeck(deckData); // Assuming you have a GraphQL mutation for creating a deck
      history.push('/home'); // Redirect to home after saving the deck
    } catch (error) {
      console.error('Error creating deck:', error);
      alert('There was an error creating the deck. Please try again.');
    }
  };

  return (
    <div className="create-deck">
      <h1>Create New Deck</h1>
      <form onSubmit={handleSubmit}>
        {/* Deck Name Input */}
        <div>
          <label htmlFor="deckName">Deck Name:</label>
          <input
            type="text"
            id="deckName"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="Enter deck name"
            required
          />
        </div>

        {/* Card Creation */}
        <div className="card-creation">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <div>
                <label htmlFor={`front-${index}`}>Front:</label>
                <input
                  type="text"
                  id={`front-${index}`}
                  value={card.front}
                  onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                  placeholder={`Front of card ${index + 1}`}
                  required
                />
              </div>

              <div>
                <label htmlFor={`back-${index}`}>Back:</label>
                <input
                  type="text"
                  id={`back-${index}`}
                  value={card.back}
                  onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                  placeholder={`Back of card ${index + 1}`}
                  required
                />
              </div>

              {/* Remove button for cards after the first one */}
              {index > 0 && (
                <button type="button" onClick={removeCard}>
                  Remove Card
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Buttons for adding/removing cards */}
        <div className="card-actions">
          <button type="button" onClick={addCard}>
            Add Card
          </button>
        </div>

        {/* Finish button to save the deck */}
        <div className="finish-button">
          <button type="submit">Finish</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeck;