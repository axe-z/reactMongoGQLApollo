import React from "react";
import { Link } from 'react-router-dom'
const UserInfo = props => {
    //console.log("props", props);

const formateDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US')
  var options = { hour12: true };
  const newTime = new Date(date).toLocaleTimeString('en-CA',options)
  return `à ${newTime} le ${newDate} `
}

  return (
    <div>
      <h4>Utilisateur: {props.username}</h4>
      <p>Courriel{props.email}</p>
      <p>Compte ouvert le: {formateDate(props.joinDate)}</p>
      <ul>
      <h5>Le favoris de {props.username}</h5>
      {props.favoris.length ? props.favoris.map(el => (
        <li key={el._id}>
          <Link to={`/recette/${el._id}`}><p>{el.name}</p></Link>

        </li>) ) : <p>Aucune recettes favorites pour l'instant...</p>}

      </ul>
    </div>
  );
};


export default UserInfo;
