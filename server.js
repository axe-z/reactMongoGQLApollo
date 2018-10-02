const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const bodyParser = require('body-parser'); // pour json response.
const jwt = require('jsonwebtoken');
const cors = require('cors')
//  GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");


const app = express();
//pour react
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

//Authorisation
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
   //console.log(token, typeof token) // null apres le click , si y a rien token arrive null, mais typeof String..
  if (token !== "null") {  //ca veut dire qu y en a un
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
       //console.log(typeof currentUser) //sort pas si aucun token AVANT le log (null) , mais au deuxieme log oui
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});


//Schema
const Recette = require('./models/Recette');
const User = require('./models/User');

//typedefs et resolvers
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

//graphqlSchema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

///mlabs
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Db connecté"))
  .catch(err => console.error(err));

//app graphiql
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


//Connection des Schemas mongoose a graphQl
app.use('/graphql', bodyParser.json(), graphqlExpress(({currentUser}) => ({
  schema,
  context: {
    Recette,
    User,
    currentUser
  }
})));


const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
  console.log(`ca roule sur le port ${PORT}`);
});
