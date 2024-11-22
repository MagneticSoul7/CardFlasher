import { gql } from '@apollo/client';

// Mutation for logging in a user
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation for creating a new user
export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation for creating a new deck
export const CREATE_DECK = gql`
  mutation createDeck($title: String!) {
    createDeck(title: $title) {
      _id
      title
    }
  }
`;

// Mutation for adding a card to a deck
export const ADD_CARD = gql`
  mutation addCard($deckId: ID!, $front: String!, $back: String!) {
    addCard(deckId: $deckId, front: $front, back: $back) {
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

export const DELETE_DECK = gql`
  mutation deleteDeck($deckId: ID!) {
    deleteDeck(deckId: $deckId) {
      _id
    }
  }
`;