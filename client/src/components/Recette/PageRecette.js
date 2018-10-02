
import React, {  Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo';
import { GET_RECETTE } from './../../queries'
import RecetteLiker from './RecetteLiker.js'



const PageRecette = (props) => {

   const { _id } = props.match.params; //vient du routing /:id
  //  console.log('_ID', _id)

 return (

   <Query query={GET_RECETTE} variables={{_id}}>
    {({data : { getRecette  }, loading, error}) => {
      // console.log(getRecette)
      if (loading) return ( <div>Loading...</div> )
      if (error) return  ( <div>oups... {error}  </div> )
      return (
        <div className="App">
           {getRecette ? (
             <Fragment>
               <h4>{getRecette.name.toUpperCase()}</h4>
               <p>Categorie: <strong>{getRecette.category}</strong></p>
               <p>Description: <strong>{getRecette.description}</strong></p>
               <p>Cuisiner: <strong>{getRecette.instruction}</strong></p>
               <p>Likes: <strong>{getRecette.likes}</strong></p>
               <p>Creer Par: <strong>{getRecette.username}</strong></p>
               <RecetteLiker _id={_id} session={props.refetch}/>
             </Fragment>)
         : <p style={{background: 'rgb(2, 108, 232)', padding: '40px'}}>minute</p> }
         </div>
      )
    }}
    </Query>

  )
};

export default withRouter(PageRecette);


 




// class PageRecette extends Component {
//
//
//   render() {
//     const { _id } = this.props.match.params
//     //console.log('_ID', _id)
//     return (
//
//          <Query query={GET_RECETTE} variables={{_id}}>
//           {({data : { getRecette  }, loading, error}) => {
//             // console.log(getRecette)
//             if (loading) return ( <div>Loading...</div> )
//             if (error) return  ( <div>oups... {error}  </div> )
//             return (
//               <div className="App">
//                  {getRecette ? (
//                    <Fragment>
//                      <h4>{getRecette.name.toUpperCase()}</h4>
//                      <p>Categorie: <strong>{getRecette.category}</strong></p>
//                      <p>Description: <strong>{getRecette.description}</strong></p>
//                      <p>Cuisiner: <strong>{getRecette.instruction}</strong></p>
//                      <p>Likes: <strong>{getRecette.likes}</strong></p>
//                      <p>Creer Par: <strong>{getRecette.username}</strong></p>
//                      <RecetteLiker _id={_id}  />
//                    </Fragment>)
//                : <p style={{background: 'rgb(2, 108, 232)', padding: '40px'}}>minute</p> }
//                </div>
//             )
//           }}
//           </Query>
//
//         )
//
//   }
// }
//
// export default  withRouter(PageRecette) ;
