const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({username, email}, secret, {expiresIn});
}

//Les query de graphql revoit une promesse donc async await est une bonne idee

// const rec = Recette.findById({ _id: "5bb2b43fd572a424d3af6c27" })
// console.log(rec, rec)

exports.resolvers = {
  Query: {
    getAllRecettes: async(root, args, {Recette}) =>  await Recette.find().sort({
      createdDate: -1  //-1 = desc //1 = ascendant
    }), //.find() renvvoit tout
    getRecette: async( root, { _id }, {Recette}) =>  await Recette.findById(_id), //.findById() retourne le bon si ID
    getCurrentUser: async(root, args, { currentUser, User}) =>  {
      if(!currentUser) {
        return null;
      }
      const user = await User.findOne({username: currentUser.username})
      .populate({
        path: 'favoris',
        model: 'Recette'
      });
      return user
    },
    rechercheRecettes: async( root, { terme } , { Recette }) => {
      if(terme){
        const resultatsRecette = await Recette.find({
          $text: { $search: terme } //on pouirrait ajouter autre options, comme case sensitive
        }, {
          score: { $meta: "textScore" }
        }).sort({
          score: { $meta: "textScore" }
        });
        return resultatsRecette;
      } else {
        const recettes = await Recette.find().sort({
          likes: -1  //-1 = desc //1 = ascendant
        })
          return recettes
      }
    },
    getRecetteUtilisateur: async(root, { username }, {Recette}) =>   await Recette.find({ username }).sort({
      createdDate: -1  //-1 = desc //1 = ascendant
    })

  },
  //Mutation
  Mutation: {
       //Mutation (3 args : parent, args et context)
    addRecette: async(root, { name, category, description, instruction, username }, { Recette }) => {
        const newRecette = await new Recette({
          name, category, description, instruction, username
        }).save()
        return newRecette
    },

    loginUser: async(root, {username, password}, {User}) => {
      const user = await User.findOne({username});
      if(!user) {
          throw new Error('Utilisateur inconnu, veillez vous assurer d\'avoir un compte')
      }
      //verifier le password hashé ( promise avec bcrypt!! )
      const isValidPassword = await bcrypt.compare(password, user.password);

      if(!isValidPassword){
          throw new Error('Mauvais password')
      }
      return  { token: createToken(user, process.env.SECRET, "24hr") }
    },

    signupUser: async(root, {username,email,password}, {User}) => {
      const user = await User.findOne({username});
      if(user){
        throw new Error('Utilisateur déjà présent')
      }
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "24hr") }
    },
    deleteRecetteUtilisateur: async(root, { _id }, { Recette }) =>  await Recette.findOneAndRemove({ _id }),

    likeRecette: async(root, { _id, username }, { Recette, User }) => {
      const recette = await Recette.findOneAndUpdate({ _id }, { $inc: {likes: 1 }})
      const user = await User.findOneAndUpdate({ username }, { $addToSet: { favoris: _id }})
      return recette
    },
    unlikeRecette: async(root, { _id, username }, { Recette, User }) => {

      const recette = await Recette.findOneAndUpdate({ _id }, { $inc: {likes: -1 }})
      const user = await User.findOneAndUpdate({ username }, { $pull: { favoris: _id }})
       // setTimeout(() =>  console.log('remove', recette.likes)  , 2000 )
      return recette
    }
  }
};
