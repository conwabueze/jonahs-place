import { Component } from 'react';
import {} from 'react-router-dom';
import Login from './Login';
import AccountSettings from './AccountSettings';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
import axios from 'axios';
const apiUrl = 'https://jonahsplace.herokuapp.com/api/v1';

//http://localhost:3001/api/v1
class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmailInput: '',
      loginPasswordInput: '',
      redirect: null,
      userName: this.props.user.name,
      userEmail: this.props.user.email,
      userPassword: '',
      userNewPassword: '',
      userConfirmPassword: '',
    };

    this.handleAccountInputs = this.handleAccountInputs.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  //update state in relation to whats being typed in the input fields
  handleAccountInputs(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //action after you click on Login in
  async loginSubmit(e) {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3001/api/v1/users/login`,
      {
        email: this.state.loginEmailInput,
        password: this.state.loginPasswordInput,
      },
      { withCredentials: true }
    );

    if (res) {
      this.props.appRerender();
      this.setState({ redirect: '/' });
    }
  }

  renderCorrectComponent() {
    if (this.props.renderLogin) {
      return (
        <Login
          handleAccountInputs={this.handleAccountInputs}
          loginEmailInput={this.state.loginEmailInput}
          loginPasswordInput={this.state.loginPasswordInput}
          loginSubmit={this.loginSubmit}
          redirect={this.state.redirect}
        />
      );
    } else if (this.props.renderSettings) {
      return <AccountSettings user={this.props.user} />;
    }
  }

  render() {
    return <ContentContainer>{this.renderCorrectComponent()}</ContentContainer>;
  }
}

export default Account;
