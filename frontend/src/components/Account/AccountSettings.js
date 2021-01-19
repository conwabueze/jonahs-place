import { Component } from 'react';
import './AccountSettings.css';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
import axios from 'axios';
const apiUrl = 'https://jonahsplace.herokuapp.com/api/v1';

class AccountSettings extends Component {
  render() {
    return (
      <div className="AccountSettings">
        <ContentContainer>
          <h1 className="AccountSettings-header">{`Hi, ${
            this.props.user.name.split(' ')[0]
          }`}</h1>
          <h2 className="AccountSettings-header2">
            here are your account settings
          </h2>
          <form className="AccountSettings-form AccountSettings-edit-form">
            <label for="name">name</label>
            <br></br>
            <input
              className="AccountSettings-input AccountSettings-edit-input"
              type="text"
              id="name"
              name="name"
              value={this.props.user.name}
            />
            <br></br>
            <label for="email">email</label>
            <br></br>
            <input
              className="AccountSettings-input AccountSettings-edit-input"
              type="email"
              id="email"
              name="email"
              value={this.props.user.email}
            />
          </form>
        </ContentContainer>
      </div>
    );
  }
}

export default AccountSettings;
