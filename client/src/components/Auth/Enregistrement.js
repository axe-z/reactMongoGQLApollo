import React from "react";
import Error from '../Error.js'
import { withRouter } from 'react-router-dom'
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
}

class Enregistrement extends React.Component {
  state = { ...initialState };  //pas une copie mais nouvel object

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();

    signupUser().then(async ({data}) => {
    //  console.log(data);
      //mettre le token sur le localstorage
      localStorage.setItem('token',  data.signupUser.token)
      // va aller rechercher le user logguer qui apparait pas au depart.
      await this.props.refetch();
      this.clearState()
      this.props.history.push('/');
    });
  };

  clearState = () => {
    this.setState({ ...initialState }) //remmetre a vide apres.
  }

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    //verifie si vide et si password est le meme
    const isInvalid = !username || !email || !password  || password !== passwordConfirmation

    return isInvalid
  }

  // ICI SE PASSE LE GROS DE L AFFAIRE: ON AMENE LE "COMPONENT" MUTATION D APOLLO
  // ON LUI DONNE LA MUTATION QU IL GERE, ET LES VARIABLES QU IL A BESOIN POUR COMPLETER LA MUTATION
  // LE RENDER PROPS RETOURNE LA FORM. ON DESTRUCTURE { data, loading, error } ET AJOUTE la mutation
  // signupUser, QUI NOUS PERMET DE L APPELER QUAND ON VEUT. ON LA PASSE EN ARGUMENT  DU SUBMIT

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    //console.log(this.props)
    return (
      <div className="App">
        <h2 className="App">Enregistrement</h2>

        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {

            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signupUser)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
                <button type="submit" className="button-primary"
                  disabled={loading || this.validateForm()}>
                  ENVOYER
                </button>
                {error && <Error error={error} />}
                {data && <p>{data.signupUser.token}</p>}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Enregistrement);
