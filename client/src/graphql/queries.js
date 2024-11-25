import { gql } from '@apollo/client';

// Query to get the logged-in user's decks
export const GET_DECKS = gql`
  query getDecks {
    getDecks {
      _id
      title
    }
  }
`;

// Query to get a single deck by ID
export const GET_DECK = gql`
  query getDeck($deckId: ID!) {
    getDeck(deckId: $deckId) {
      _id
      title
      cards {
        _id
        front
        back
      }
    }
  }
`;
