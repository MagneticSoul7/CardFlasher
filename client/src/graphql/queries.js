import { gql } from '@apollo/client';

// Query for fetching the current user's information
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    getUserProfile(userId: $userId) {
      id
      username
    }
  }
`;

// Query for fetching all decks of a specific user
export const GET_USER_DECKS = gql`
  query GetUserDecks($userId: ID!) {
    getUserDecks(userId: $userId) {
      id
      name
      cards {
        front
        back
      }
    }
  }
`;

// Query for fetching a specific deck by ID (for viewing deck details)
export const GET_DECK_BY_ID = gql`
  query GetDeckById($deckId: ID!) {
    getDeckById(deckId: $deckId) {
      id
      name
      cards {
        front
        back
      }
    }
  }
`;

// Query for fetching the list of all cards in a deck
export const GET_DECK_CARDS = gql`
  query GetDeckCards($deckId: ID!) {
    getDeckCards(deckId: $deckId) {
      id
      front
      back
    }
  }
`;