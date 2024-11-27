import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import React from 'react';
import './styles/App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import authService from './utils/Auth';


// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql', // Replace with your server URL
});

// Set the Authorization header with the user's token
const authLink = setContext((_, { headers }) => {
  const token = authService.getToken(); // Get token from localStorage
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

function App() {
  return (
      <div className="App">
        <ApolloProvider client={client}>
          <Navbar />
          <Outlet />
        </ApolloProvider>
      </div>
  );
}

export default App;
