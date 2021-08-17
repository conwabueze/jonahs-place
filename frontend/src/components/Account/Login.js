import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Login.css';

class Login extends Component {
  render() {
    const renderRedirect =
      this.props.redirect !== null ? <Redirect to={this.props.redirect} /> : '';
    const renderLoginErrorMessage =
      this.props.loginError === true ? (
        <h2 className="Login-error-header">Invalid Email or Password</h2>
      ) : (
        ''
      );
    const renderLoginInputError =
      this.props.loginError === true ? 'Login-input-error' : '';
    return (
      <div className="Login">
        <h1 className="Login-header">login</h1>
        {renderLoginErrorMessage}
        <form className="Login-form" onSubmit={this.props.loginSubmit}>
          <label className="Login-label" htmlFor="email">
            email
          </label>
          <br></br>
          <input
            className={`Login-input ${renderLoginInputError}`}
            type="email"
            name="loginEmailInput"
            id="email"
            value={this.props.loginEmailInput}
            onChange={this.props.handleAccountInputs}
            required
          />
          <br></br>
          <label className="Login-label" htmlFor="password">
            password
          </label>
          <input
            className={`Login-input ${renderLoginInputError}`}
            type="password"
            id="password"
            name="loginPasswordInput"
            minLength="8"
            value={this.props.loginPasswordInput}
            onChange={this.props.handleAccountInputs}
            required
          />
          <br></br>
          <button className="Login-submit">login</button>
          {renderRedirect}
        </form>
      </div>
    );
  }
}

export default Login;
