import React  from 'react';
import './App.css';


import { Query } from 'react-apollo';
import { GET_ALL_RECETTES } from '../queries/index';
import ItemRecette from './Recette/ItemRecette.js'



const App = props => (
  <div className="App">
    <h3>
      <strong>Recettes</strong>{" "}
    </h3>

    <Query query={GET_ALL_RECETTES}>
      {({ data: { getAllRecettes }, loading, error }) => {
        if (loading) return (<div>Loading...</div>);
        if (error) return (<div>error...</div>);
        //console.log(getAllRecettes);

        return (
          <ul>
            {getAllRecettes.map(el => <ItemRecette {...el} key={el._id} />)}
          </ul>
        );
      }}
    </Query>
  </div>
);


export default App;
