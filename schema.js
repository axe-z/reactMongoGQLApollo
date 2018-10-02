exports.typeDefs = `

type Recette {
  _id: ID
  name: String!
  category: String!
  description: String!
  instruction: String!
  createdDate: String
  likes: Int
  username: String
}

type User {
  _id: ID
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favoris: [Recette]
}

type Query {
  getAllRecettes: [Recette]
  getCurrentUser:  User
  getRecette(_id: ID!) : Recette
  getRecetteUtilisateur(username: String!) : [Recette]
  rechercheRecettes(terme: String) : [Recette]
}

type Token {
  token: String!
}

type Mutation {
  addRecette(name: String!, category: String! description: String!,
   instruction: String!, username: String) : Recette

   signupUser(username: String!, email: String! password: String!) : Token

   loginUser(username: String!, password: String!) : Token

   deleteRecetteUtilisateur(_id: ID!) : Recette
   likeRecette(_id: ID!, username: String!) : Recette
   unlikeRecette(_id: ID!, username: String!) : Recette
}


`;
