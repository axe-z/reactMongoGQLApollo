import React, { Component } from 'react';

import { ApolloConsumer } from 'react-apollo';
import { RECHERCHE_RECETTES } from '../../queries/index';
// import { withRouter } from 'react-router-dom'
import RechercheItem from './RechercheItem.js'




class Recherche extends Component {
  constructor(props) {
    super(props);
    // this.myRef = React.createRef();
    this.state = {
      resultatsRecette: []
    };
  }

  handleChange = ({ rechercheRecettes }) => {
    // console.log(rechercheRecettes)
    this.setState({
      resultatsRecette: rechercheRecettes
    });
  };

  componentDidMount = () => {
    this.refAjouté.focus();
  };

  render() {
    const { resultatsRecette } = this.state;
    //console.log(resultatsRecette); //pizza : [{…}, {…}]
    return (
      <div className="App">
        <ApolloConsumer>
          {client => (
            <div>
              <label htmlFor="name">Votre Recherche</label>
              <input
                type="search"
                ref={n => (this.refAjouté = n)}
                className="search"
                placeholder="Recherche"
                onChange={async event => {
                  event.persist(); // pu sur que ce soit necessaire
                  const { data } = await client.query({
                    query: RECHERCHE_RECETTES,
                    variables: { terme: event.target.value }
                  });
                  // console.log("client", client.cache.data.data)b
                  this.handleChange(data); //{rechercheRecettes: Array(0), Symbol(id): "ROOT_QUERY"}
                }}
              />

              <ul>
                {resultatsRecette.map(recette => (
                  // <RechercheItem key={recette._id} _id={recette._id} name={recette.name} likes={recette.likes}/>
                  //MIEUX
                  <RechercheItem key={recette._id} {...recette} />
                ))}
              </ul>
            </div>
          )}
        </ApolloConsumer>
      </div>
    );
  }
}


export default Recherche;
