import React from "react";
import Error from "../Error.js";
import { withRouter } from 'react-router-dom'
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../queries";

const initialState = {
  username: "",
  password: ""
};

class Login extends React.Component {
  state = { ...initialState }; //pas une copie mais nouvel object

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, loginUser) => {
    event.preventDefault();
    //parce que data , est un object avec data dedans , destructure meme  que {data: {loginUser}} serait mieux
    loginUser().then( async ({data}) => {
      //console.log(data);
      //mettre le token sur le localstorage
      localStorage.setItem('token',  data.loginUser.token)
      // va aller rechercher le user logguer qui apparait pas au depart, apres le login.
      await this.props.refetch();

      this.clearState();
      this.props.history.push('/');
    });
  };

  clearState = () => {
    this.setState({ ...initialState }); //remmetre a vide apres.
  };

  validateForm = () => {
    const { username, password } = this.state;
    //verifie si vide et si password est le meme
    const isInvalid = !username || !password;

    return isInvalid;
  };

  // ICI SE PASSE LE GROS DE L AFFAIRE: ON AMENE LE "COMPONENT" MUTATION D APOLLO
  // ON LUI DONNE LA MUTATION QU IL GERE, ET LES VARIABLES QU IL A BESOIN POUR COMPLETER LA MUTATION
  // LE RENDER PROPS RETOURNE LA FORM. ON DESTRUCTURE { data, loading, error } ET AJOUTE la mutation
  // loginUser, QUI NOUS PERMET DE L APPELER QUAND ON VEUT. ON LA PASSE EN ARGUMENT  DU SUBMIT

  render() {
    const { username, password } = this.state;
    //console.log(this.props)
    return (
      <div className="App">
        <h2 className="App">Login</h2>

        <Mutation mutation={LOGIN_USER} variables={{ username, password }}>
          {(loginUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, loginUser)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />

                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  ENVOYER
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Login);
