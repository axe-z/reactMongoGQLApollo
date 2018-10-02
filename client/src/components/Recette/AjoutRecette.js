import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { Mutation } from "react-apollo";
import withAuth from '../Auth/withAuth.js'
import { ADD_RECETTE,  GET_ALL_RECETTES , GET_RECETTE_UTILISATEUR   } from './../../queries';
import Error from '../Error.js'

const initialState = {
  name: "",
  instruction: "",
  category: "Diner",
  description: "",
  username: ""
};


class AjoutRecette extends Component {
  state = {...initialState}

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, value)
    this.setState({ [name]: value });
  };

  updateCache = (cache,  { data: { addRecette } } ) => {
  //console.log(cache, getAllRecettes); //InMemoryCache {optimistic: Array(0), watches: Array(2), typenameDocumentCache: WeakMap, silenceBroadcast: true, config: {…}, …} {data: {…}}
  const { getAllRecettes } = cache.readQuery({ query: GET_ALL_RECETTES });
  // console.log('read cache:', getAllRecettes)
  // console.log('read data:', getAllRecettes)
  cache.writeQuery({
    query: GET_ALL_RECETTES,
    data: {
      getAllRecettes: [addRecette, ...getAllRecettes]
    }
  });
  // return getAllRecettes
};



  handleSubmit = (event, addRecette) => {
    event.preventDefault();
    addRecette().then(({data}) => {
       console.log(data) //{addRecette: {…}}
    });
    this.clearState()
    this.props.history.push('/');
  }

  clearState = () => {
    this.setState({ ...initialState }); //remmetre a vide apres.
  };

  valideForm = () => {
    const { name,   category, description, instruction } = this.state;
    const isInvalid =
      !name  || !category || !description || !instruction;
    return isInvalid;
  };

  render() {
    // console.log(this.props.session.getCurrentUser.username)
    const { name,   category, description, instruction, username } = this.state;
     //console.log(this.props) avec le withRouter on a le match, location, history...
    return (
      <Mutation
        mutation={ADD_RECETTE}
        variables={{
          name,
          category,
          description,
          instruction,
          username
        }}

        update={this.updateCache}
        refetchQueries={ () => [
          {query: GET_RECETTE_UTILISATEUR, variables: { username }} //pour updater les recettes du user
        ]}
      >
      {(addRecette, {data, loading, error}) => {
        // if (loading)  return (<div>Loading...</div>)  on disable le btn en bas si loading
       if (error) return (<Error error={error} />) // et error en bas
       return (
      <div className="App">
        <h2 className="main-title">Ajout De Recette de {username}</h2>

        <form className="form" onSubmit={ (event) => this.handleSubmit(event, addRecette)}>

          <label htmlFor="name">Nom De Recette</label>
          <input
            type="text"
            name="name"
            placeholder="Ajouter le nom"
            value={name}
            onChange={this.handleChange}
          />

          {/*<label htmlFor="imageUrl">Image de Recette</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Ajouter le lien d'image"
            onChange={this.handleChange}
            value={imageUrl}
          />*/}

          <label htmlFor="category">Categorie De Recette</label>
          <select name="category" value={category} onChange={this.handleChange}>
            <option value="Déjeuner">Déjeuner</option>
            <option value="Diner">Diner</option>
            <option value="Souper">Souper</option>
            <option value="Collation">Collation</option>
          </select>

          <label htmlFor="description">Description De Recette</label>
          <input
            type="text"
            name="description"
            placeholder="Ajouter Description"
            value={description}
            onChange={this.handleChange}
          />

          <label htmlFor="instruction">Instructions</label>
          <textarea
            type="text"
            name="instruction"
            placeholder="Ajouter Instructions"
            value={instruction}
            onChange={this.handleChange}
          />
          <button disabled={loading || this.valideForm()} type="submit" className="button-primary">
            Envoyer
          </button>
        </form>
      </div>
    )

        }}
      </Mutation>
    );
  }
}
export default withAuth( session => session && session.getCurrentUser ) (withRouter(AjoutRecette)) ;
