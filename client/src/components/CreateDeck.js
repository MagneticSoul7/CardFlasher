import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DECK, ADD_CARD } from '../graphql/mutations';
import '../styles/CreateDeck.css';

const CreateDeck = ({ onComplete }) => {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ front: '', back: '' }]);
  const [createDeck] = useMutation(CREATE_DECK);
  const [addCard] = useMutation(ADD_CARD);

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

      onComplete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-deck">
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Deck Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {cards.map((card, index) => (
          <div key={index}>
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
        <button type="button" onClick={handleAddCard}>Add Card</button>
        <button type="button" onClick={handleRemoveCard}>Remove Card</button>
        <button type="submit">Save Deck</button>
      </form>
    </div>
  );
};

export default CreateDeck;
