import React from "react";
import { Link } from 'react-router-dom'

const RechercheItem = ({_id, name, likes }) => {

 return (
   <li>
    <Link to={`/recette/${_id}`}><h4>{name}</h4></Link>
    <p style={{fontSize: '14px'}}><small>likes:</small> {likes}</p>
   </li>
  )
};

export default RechercheItem;
