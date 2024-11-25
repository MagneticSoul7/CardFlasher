import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './styles/index.css';

// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Replace with your server URL
});

// Set the Authorization header with the user's token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  console.log('Token in localStorage:', token); // Debugging log
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Add token if available
    },
  };
});

// Initialize Apollo Client with the authLink and httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(), // Cache for Apollo Client
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
