import React from "react";
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom'


const Logout = (props) => {

  const handleLogout = (client) => {
    //enlever le token
    localStorage.removeItem('token')
    //reset le store
    client.resetStore();
    //console.log(localStorage.getItem('token')); // disparu !
     props.history.push('/'); //redirect
  }
  return (
    <ApolloConsumer>
    {(  client ) => {
    //   console.log("cache:", client.cache )
        return (
          <button onClick={() => handleLogout(client)}>Quitter {props.session.getCurrentUser.username}</button>
        )
     }}
    </ApolloConsumer>
  );
};


export default withRouter(Logout);
