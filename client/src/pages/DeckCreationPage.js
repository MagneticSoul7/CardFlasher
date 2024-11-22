import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DECK, ADD_CARD } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import '../styles/DeckCreationPage.css';

const DeckCreationPage = () => {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ front: '', back: '' }]);
  const [createDeck] = useMutation(CREATE_DECK);
  const [addCard] = useMutation(ADD_CARD);
  const navigate = useNavigate();

  const handleAddCard = () => {
    setCards([...cards, { front: '', back: '' }]);
  };

  const handleRemoveCard = () => {
    if (cards.length > 1) {
      setCards(cards.slice(0, -1));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createDeck({ variables: { title } });
      const deckId = data.createDeck._id;

      for (const card of cards) {
        await addCard({ variables: { deckId, front: card.front, back: card.back } });
      }

      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="deck-creation-page">
      <h2>Create a New Deck</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Deck Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="deck-title-input"
        />
        {cards.map((card, index) => (
          <div key={index} className="card-creation-container">
            <input
              type="text"
              placeholder="Front"
              value={card.front}
              onChange={(e) => {
                const newCards = [...cards];
                newCards[index].front = e.target.value;
                setCards(newCards);
              }}
              required
            />
            <input
              type="text"
              placeholder="Back"
              value={card.back}
              onChange={(e) => {
                const newCards = [...cards];
                newCards[index].back = e.target.value;
                setCards(newCards);
              }}
              required
            />
          </div>
        ))}
        <div className="button-container">
          <button type="button" onClick={handleAddCard} className="add-card-button">
            Add Card
          </button>
          <button type="button" onClick={handleRemoveCard} className="remove-card-button">
            Remove Card
          </button>
          <button type="submit" className="finish-button">Finish</button>
        </div>
      </form>
    </div>
  );
};

export default DeckCreationPage;
