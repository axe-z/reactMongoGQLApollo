import React from "react";

import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "./../queries/index";

//HOC qui va donner le user au Component en children
const WithSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
 
    {({ data, loading, refetch }) => {
      if (loading) return null;
        //  console.log(data);
        // refetch redonne le user, a l enregis. il faut reloader pour voir le user, refetch va le faire automatiquement.
      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default WithSession;
