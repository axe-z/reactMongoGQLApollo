import React, { Component } from "react";
import WithSession from './../WithSession.js';
import { Mutation } from 'react-apollo';
//import { LIKE_RECETTE, GET_ALL_RECETTES, GET_CURRENT_USER, GET_RECETTE, UNLIKE_RECETTE, GET_RECETTE_UTILISATEUR } from './../../queries'
 import { LIKE_RECETTE, UNLIKE_RECETTE,  GET_RECETTE } from './../../queries'




class RecetteLiker extends Component {
  state = {
    username: "",
    liker: false
  };
  componentDidMount = () => {
    if (this.props.session.getCurrentUser) {
      const { username, favoris } = this.props.session.getCurrentUser;

      //verifier si on deja liker une fois:
      const { _id } = this.props; //est recu par props de PageRecette
      //console.log(favoris); // array
      //console.log(_id); //"5bb14523d4241a17900f40e9" le _id de "ailes de poulet buffalo"
      const dejaLiker = favoris.findIndex(fav => fav._id === _id) > -1;
      //console.log(dejaLiker ? 'true' : 'false');

      this.setState({ username, liker: dejaLiker });
    }
  };

  handleClick = (likeRecette , unlikeRecette ) => {
    this.setState(
      prevState => ({
        liker: !prevState.liker
      }),
      () => this.handleLike(likeRecette , unlikeRecette )
    );
  };

  handleLike = (likeRecette , unlikeRecette ) => {
    const {refetch} = this.props
     //console.log(refetch)
    if (this.state.liker) {
      likeRecette().then(async ({ data }) => {
        await refetch();
      // console.log("refetch likeRecette", data)

      });
    } else {
      unlikeRecette().then(async ({ data }) => {
        await refetch();
      //  console.log("unlikeRecette", data)
      });
    }
  };

  //like
  // updateLike = (cache, { data : { likeRecette } }) => {
  //
  //    const { _id } = this.props;
  //    const { getRecette } = cache.readQuery({ query: GET_RECETTE, variables: { _id } });
  //
  //    cache.writeQuery({
  //      query: GET_RECETTE,
  //      variables:{ _id },
  //      data: {
  //        getRecette: { ...getRecette, likes: likeRecette.likes + 1 }
  //      }
  //    })
  //
  // };

//unlike
  // updateUnlike = (cache, { data : { unlikeRecette } }) => {
  //
  //    const { _id } = this.props;
  //    const { getRecette } = cache.readQuery({ query: GET_RECETTE, variables: { _id } });
  //
  //    cache.writeQuery({
  //      query: GET_RECETTE,
  //      variables:{ _id },
  //      data: {
  //        getRecette: { ...getRecette, likes: unlikeRecette.likes - 1 }
  //      }
  //    })
  //
  // };

//update={this.updateUnlike} update={this.updateLike}
  render() {
    //console.log(this.props.session.getCurrentUser)

    const { username, liker } = this.state;
    const { _id } = this.props; // VIENT DU PARENT
    //  console.log(this.props)
    return (
      <div>
        <Mutation
          mutation={UNLIKE_RECETTE}
          variables={{ _id, username }}
          refetchQueries={ () => [
            {query: GET_RECETTE , variables: {  _id }}
          ]}
        >
          {unlikeRecette => (
            <Mutation
              mutation={LIKE_RECETTE}
              variables={{ _id, username }}
              refetchQueries={ () => [
                {query: GET_RECETTE , variables: {  _id }}
              ]}
            >
              {(likeRecette, { data, loading, error, client }) => {
                return (
                  username && (
                    <button
                      className="like-button"
                      onClick={() =>
                        this.handleClick(likeRecette, unlikeRecette)
                      }
                    >
                      {liker ? "de-Like" : "Like"}
                    </button>
                  )
                );
              }}
            </Mutation>
          )}
        </Mutation>
      </div>
    );
  }
  }


export default WithSession(RecetteLiker);


// render() {
//   //console.log(this.props.session.getCurrentUser)
//
//   const { username, liker } = this.state;
//   const { _id } = this.props; // VIENT DU PARENT
//   //  console.log(this.props)
//   return (
//     <div>
//       <Mutation
//         mutation={UNLIKE_RECETTE}
//         variables={{ _id, username }}
//       >
//         {unlikeRecette => (
//           <Mutation
//             mutation={LIKE_RECETTE}
//             variables={{ _id, username }}
//             refetchQueries={ () => [
//               {query: GET_RECETTE_UTILISATEUR, variables: { username }} //pour updater les recettes du user
//             ]}
//
//           >
//             {(likeRecette, { data, loading, error, client }) => {
//               return (
//                 username && (
//                   <button
//                     className="like-button"
//                     onClick={() =>
//                       this.handleClick(likeRecette, unlikeRecette)
//                     }
//                   >
//                     {liker ? "de-Like" : "Like"}
//                   </button>
//                 )
//               );
//             }}
//           </Mutation>
//         )}
//       </Mutation>
//     </div>
//   );
// }
// }
