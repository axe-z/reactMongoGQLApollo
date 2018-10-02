import React   from "react";
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom'
import { GET_RECETTE_UTILISATEUR, DELETE_RECETTE_UTILISATEUR, GET_ALL_RECETTES, GET_CURRENT_USER  } from './../../queries/index';


const handleDelete = (deleteRecetteUtilisateur, refetch) => {
  const confirmeDelete = window.confirm('Etes vous sur de vouloir deleter cette recette?')
  //ca devient , selon la reponse, un bool
  if(confirmeDelete){
  //  deleteRecetteUtilisateur().then( async({data}) => await refetch() )
    deleteRecetteUtilisateur().then( ({data}) =>   console.log(data) )
  }
}

const RecettesUtilisateur = ({ username }) => {
  return (
    <Query query={GET_RECETTE_UTILISATEUR} variables={{ username }}>
      {({ data, loading, error, refetch, networkStatus, client }) => {
        // console.log(client)
        if (loading) return "Loading";
        if (error) return `Error!: ${error}`;
        //console.log(data.getRecetteUtilisateur); //Arrray de tousles recettes
        return (
          <div>
            <h3> Recettes de {username} </h3>
            {!data.getRecetteUtilisateur.length && (<p>Vous n'avez toujours rien ajouté</p>) }
            <ul>
              {data.getRecetteUtilisateur.map(el => (
                <li key={el._id}>
                  <Link to={`/recette/${el._id}`}>
                    <p>{el.name}</p>
                  </Link>
                  <p style={{ marginBottom: 0 }}>likes: {el.likes} </p>

                  <Mutation
                    mutation={ DELETE_RECETTE_UTILISATEUR }
                     variables={{ _id : el._id }}
                     refetchQueries={ () => [
                       {query: GET_ALL_RECETTES },
                       {query: GET_CURRENT_USER }  //si dans les favoris
                     ]}
                     update={(cache, data) => {
                        const { getRecetteUtilisateur } = cache.readQuery({
                          query: GET_RECETTE_UTILISATEUR,
                          variables: { username }
                        });

                        cache.writeQuery({
                          query: GET_RECETTE_UTILISATEUR,
                          variables: { username },
                          data: {
                            getRecetteUtilisateur: getRecetteUtilisateur.filter( recette => {
                              return recette._id !== data.data.deleteRecetteUtilisateur._id
                            })
                          }
                        })
                     }}
                     >
                    {
                      (deleteRecetteUtilisateur, attrs) => {
                        // console.log(attrs) //ca ressemble au client complet..
                        return (
                          <div>
                            <p className="delete-button"
                              onClick={(e) => handleDelete(deleteRecetteUtilisateur, refetch)}>
                              {attrs.loading ? 'supression...' : 'X'}
                             </p>
                          </div>
                        )
                      }
                    }
                  </Mutation>

                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};

export default RecettesUtilisateur;
