//import { gql } from 'apollo-boost'
import gql from "graphql-tag";
// import { fragmentRecette } from './fragments';

export const GET_ALL_RECETTES = gql`
  query {
    getAllRecettes {
      _id
      name
      category
      description
      instruction
      createdDate
      likes
    }
  }
`;
export const GET_RECETTE = gql`
query($_id: ID!) {
  getRecette(_id: $_id) {
    _id
    name
    category
    description
    instruction
    createdDate
    likes
    username
  }
}
`;
export const GET_RECETTE_UTILISATEUR = gql`
query($username: String!) {
  getRecetteUtilisateur(username: $username) {
    _id
    name
    likes
  }
}
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      joinDate
      email
      favoris {
        _id
        name
        likes
      }
    }
  }
`;

export const RECHERCHE_RECETTES = gql`
query($terme: String) {
  rechercheRecettes( terme: $terme) {
    _id
    name
    likes
  }
}
`;

/************************************ MUTATIONS ************************************/

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_RECETTE = gql`
  mutation($name: String!, $category: String! $description: String!,
   $instruction: String!, $username: String) {
    addRecette( name: $name, category: $category, description: $description,
      instruction: $instruction,  username: $username) {
        _id
        name
        category
        description
        instruction
        createdDate
        likes
        username
    }
  }
`;


export const LOGIN_USER = gql`
mutation($username: String!,$password: String!){
  loginUser(username: $username , password: $password){
    token
  }
}
`;

export const DELETE_RECETTE_UTILISATEUR = gql`
mutation($_id: ID!){
  deleteRecetteUtilisateur( _id: $_id ){
    _id
  }
}
`;


export const LIKE_RECETTE = gql`
mutation($_id: ID!, $username: String!){
  likeRecette(_id: $_id, username: $username){
    _id
    likes
  }
}
`;


export const UNLIKE_RECETTE  = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecette(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;
