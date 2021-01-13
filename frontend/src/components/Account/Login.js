import { Component } from 'react';

import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h1 className="Login-header">login</h1>
        <form class="Login-form">
          <label className="Login-label" for="email">
            email
          </label>
          <br></br>
          <input
            className="Login-input"
            type="email"
            name="email"
            id="email"
            required
          />
          <br></br>
          <label className="Login-label" for="password">
            password
          </label>
          <input
            className="Login-input"
            type="password"
            id="password"
            name="password"
            minLength="8"
            required
          />
          <br></br>
          <button className="Login-submit">login</button>
        </form>
      </div>
    );
  }
}

export default Login;
