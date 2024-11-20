import { gql } from '@apollo/client';

// Mutation for creating a new user profile
export const CREATE_USER_PROFILE = gql`
  mutation CreateUserProfile($username: String!, $password: String!) {
    createUserProfile(username: $username, password: $password) {
      id
      username
      password
    }
  }
`;

// Mutation for creating a new deck
export const CREATE_DECK = gql`
  mutation CreateDeck($userId: ID!, $deckName: String!, $cards: [CardInput!]!) {
    createDeck(userId: $userId, deckName: $deckName, cards: $cards) {
      id
      name
      cards {
        front
        back
      }
    }
  }
`;

// Mutation for updating an existing deck
export const UPDATE_DECK = gql`
  mutation UpdateDeck($deckId: ID!, $deckName: String, $cards: [CardInput!]) {
    updateDeck(deckId: $deckId, deckName: $deckName, cards: $cards) {
      id
      name
      cards {
        front
        back
      }
    }
  }
`;

// Mutation for deleting a deck
export const DELETE_DECK = gql`
  mutation DeleteDeck($deckId: ID!) {
    deleteDeck(deckId: $deckId) {
      id
    }
  }
`;