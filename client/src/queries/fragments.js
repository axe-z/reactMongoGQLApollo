import { gql } from 'apollo-boost';


export const fragmentRecette = {
  recette: gql`
    fragment CompleteRecette on Recette {
      _id
      name
      category
      description
      instruction
      createdDate
      likes
    }
  `,
  like: gql`
    fragment LikeRecette on Recette {
      _id
      likes
    }
  `
};
