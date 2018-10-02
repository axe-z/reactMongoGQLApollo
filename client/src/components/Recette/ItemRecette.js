import React from "react";
import { Link } from 'react-router-dom'

const ItemRecette = ({_id, name, category, description}) => {

 return (
   <li>
    <Link to={`/recette/${_id}`}><h4>{name}</h4></Link>
    <p style={{fontSize: '14px'}}><small>{description}</small></p>
    <h6><strong>{category}</strong></h6>
   </li>
  )
};

export default ItemRecette;
