import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, useQuery, gql,ApolloProvider } from '@apollo/client';
//import './index.css';
import  "../src/styles.css"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


const client = new ApolloClient({
  uri : "http://localhost:5202/graphql/",
  cache : new InMemoryCache()
});

root.render(
  <ApolloProvider client={client} >
      <App />
  </ApolloProvider>
);

