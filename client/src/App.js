import React from 'react';
import Navbar from './components/Navbar';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

import { ApolloProvider } from '@apolo/react-hooks';
import { ApolloClient } from 'apollo-boost';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';



// import {
//   ApolloClient,
// //  InMemoryCache,
//   ApolloProvider,
//   createHttpLink
// } from '@apollo/client';

// import {
//   setContext
// } from '@apollo/client/link/context';

// const http = createHttpLink({ uri: '/graphql'});

// const auth = setContext((_, {headers }) => {

//   const token = localStorage.getItem('id_token');

//   return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '', } };

// });

// const client = new ApolloClient({ link: auth.concat(http), cache: new InMemoryCache(), });

const client = new ApolloClient({

  request: (operation) => {

    const token = localStorage.getItem('id_token');

    operation.setContext({ headers: { authorization: token ? `Bearer ${token}` : '', }, });

  },

  uri: '/graphql',

});

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render = { () => <h1 className='display-2'>Incorect Page</h1> } />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
