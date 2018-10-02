import React from "react";
import {  Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "./../../queries/index";

//HOC qui va donner le user au Component en children
const withAuth = conditionFn => Component => props => (

  <Query query={GET_CURRENT_USER}>

    {({ data, loading }) => {
      if (loading) return null;
      //regarde si la fnCondition passe ou pas
      return conditionFn(data) ? <Component {...props} /> : <Redirect to="/" /> ;
    }}
  </Query>
);

export default withAuth;
