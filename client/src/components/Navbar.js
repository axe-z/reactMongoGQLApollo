import React, { Fragment} from "react";
import { NavLink } from 'react-router-dom'
import Logout from './Auth/Logout.js'

const Navbar = ({ session }) => {
  // console.log(session)
 return (
    <nav>
    {session.getCurrentUser ? <NavbarAvecAuth session={session}/> : <NavbarSansAuth />}


    </nav>
  )
};

const NavbarAvecAuth = ({session }) => {
 return (
   <Fragment>
  <ul style={{marginBottom: '0'}}>
    <li><NavLink to="/" exact>Accueil</NavLink></li>
    <li><NavLink to="/recherche" exact>Recherche</NavLink></li>
    <li><NavLink to="/recette/ajout" exact>Ajout</NavLink></li>
    <li><NavLink to="/profil" exact>Profil</NavLink></li>
    <li>
    <Logout session={session} />
    </li>
  </ul>
  <h6>Bienvenue {session.getCurrentUser.username.toUpperCase()}</h6>
  </Fragment>
  )
};

const NavbarSansAuth = (props) => {
 return (
  <ul>
    <li><NavLink to="/" exact>home</NavLink></li>
    <li><NavLink to="/recherche" exact>recherche</NavLink></li>
    <li><NavLink to="/login" exact>login</NavLink></li>
    <li><NavLink to="/enregistrement" exact>enregistrement</NavLink></li>
  </ul>
  )
};


export default Navbar;
