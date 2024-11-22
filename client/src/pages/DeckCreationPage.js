import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DECK } from './mutations'; // Import your mutation
import { useHistory } from 'react-router-dom';

const DeckCreationPage = () => {
  const [deckName, setDeckName] = useState(''); // State for deck name
  const [cards, setCards] = useState([{ front: '', back: '' }]); // State for cards

  const [createDeck] = useMutation(CREATE_DECK); // Mutation to create a new deck
  const history = useHistory(); // To redirect after creating the deck

  // Handle changes in the deck name input
  const handleDeckNameChange = (e) => {
    setDeckName(e.target.value);
  };

  // Handle changes in the front and back of each card
  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  // Add a new card
  const addCard = () => {
    setCards([...cards, { front: '', back: '' }]);
  };

  // Remove the most recently added card
  const removeCard = () => {
    if (cards.length > 1) {
      setCards(cards.slice(0, cards.length - 1));
    }
  };

  // Handle form submission to create the deck
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the mutation to create the deck with its name and cards
      await createDeck({
        variables: {
          name: deckName,
          cards: cards.map((card) => ({
            front: card.front,
            back: card.back,
          })),
        },
      });

      // Redirect to the home page after the deck is created
      history.push('/home');
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div className="deck-creation-page">
      <h1>Create New Deck</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="deckName">Deck Name:</label>
          <input
            type="text"
            id="deckName"
            value={deckName}
            onChange={handleDeckNameChange}
            required
          />
        </div>

        <div className="card-creation-container">
          <h2>Cards</h2>
          {cards.map((card, index) => (
            <div key={index} className="card-box">
              <label htmlFor={`front-${index}`}>Front:</label>
              <input
                type="text"
                id={`front-${index}`}
                value={card.front}
                onChange={(e) => handleCardChange(index, 'front', e.target.value)}
                required
              />

              <label htmlFor={`back-${index}`}>Back:</label>
              <input
                type="text"
                id={`back-${index}`}
                value={card.back}
                onChange={(e) => handleCardChange(index, 'back', e.target.value)}
                required
              />
              {/* Remove button for cards after the first one */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={removeCard}
                  className="remove-card-button"
                >
                  Remove Card
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="buttons">
          <button type="button" onClick={addCard} className="add-card-button">
            Add Card
          </button>
          <button type="submit" className="finish-button">
            Finish
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckCreationPage;