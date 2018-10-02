import React, { Fragment} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,  //rename plus simple
  Route, Switch, Redirect } from "react-router-dom";
import './index.css';

//components
import App from './components/App';
// import Tester from './Tester';
import Login from "./components/Auth/Login";
import Enregistrement from "./components/Auth/Enregistrement";
import WithSession from './components/WithSession.js'
import Navbar from './components/Navbar.js'
import Recherche from './components/Recette/Recherche.js'
import AjoutRecette from './components/Recette/AjoutRecette.js'
import PageRecette from './components/Recette/PageRecette.js'
import Profil from './components/Profil/Profil.js'

//Apollo
import  ApolloClient  from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//new shit


//lien pour server
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      localStorage.setItem("token", "");
    }
  }
  // cache
});




//refetch va reloader pour donner le user, pour le passe en prop faut render
const Root = ({refetch, session}) => (
  <Router>
  <Fragment>
    <Navbar session={session}/>
    {/*{   console.log("session:"  , session ) }*/}
    <Switch>
      <Route path="/" exact component={ App } />
      {/*<Route path="/tester" exact component={ Tester } />*/}
      <Route path="/recherche" exact render={() => <Recherche  session={session}/>} />
      <Route path="/Login" render={() => <Login refetch={refetch} />} />
      <Route path="/Enregistrement" render={() => <Enregistrement refetch={refetch} />} />
      <Route path="/recette/ajout" render={() => <AjoutRecette session={session}/>} />
      <Route path="/recette/:_id"   render={() => <PageRecette session={session}/>} />
      <Route path="/profil" render={() => <Profil  session={session} />} />
      <Redirect to="/" />
    </Switch>
   </Fragment>
  </Router>
);


//donne refetch, session a root
const RootWithSession = WithSession(Root)


ReactDOM.render(
 <ApolloProvider client={client}>
  <RootWithSession />
</ApolloProvider>
  , document.getElementById('root'));
