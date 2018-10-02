import React from "react";
import UserInfo from './UserInfo.js';
import RecettesUtilisateur from './RecettesUtilisateur.js';
import withAuth from './../Auth/withAuth.js';


const Profil = ({session: {getCurrentUser}}) => {
   //console.log(getCurrentUser)
 return (
  <div className="App">
    <UserInfo {...getCurrentUser}/>
    <RecettesUtilisateur username={getCurrentUser.username} />
    </div>
  )
};

// export default withAuth( session => session.getCurrentUser ? true : false )(Profil);
// ou , pour retourner si true
export default withAuth( session => session && session.getCurrentUser   )(Profil);
