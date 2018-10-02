import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from './queries';

class Tester extends Component {
  render() {
    return (
      <div className="Tester">
      <Query query={GET_CURRENT_USER} >
      {(r) => {
             console.log(r)

        return (
          <h1>Tester</h1>
        )
      }}
      </Query>
      </div>
    );
  }
}
export default Tester;


//QUERY

// {data: {…}, variables: {…}, refetch: ƒ, fetchMore: ƒ, updateQuery: ƒ, …}
// client: DefaultClient {defaultOptions: {…}, resetStoreCallbacks: Array(0), link: ApolloLink, cache: InMemoryCache, store: DataStore, …}
// data: {getCurrentUser: {…}}
// error: undefined
// fetchMore: ƒ ()
// loading: false
// networkStatus: 7
// refetch: ƒ (args)
// startPolling: ƒ ()
// stopPolling: ƒ ()
// subscribeToMore: ƒ ()
// updateQuery: ƒ ()
// variables: {}
