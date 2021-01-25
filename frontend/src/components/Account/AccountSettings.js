import { Component } from 'react';
import './AccountSettings.css';
import { Redirect } from 'react-router-dom';
import ContentContainer from '../shared/ContentContainer/ContentContainer';

class AccountSettings extends Component {
  render() {
    const renderRedirect =
      this.props.redirect !== null ? <Redirect to={this.props.redirect} /> : '';
    return (
      <div className="AccountSettings">
        <ContentContainer>
          <h1 className="AccountSettings-header">{`Hi, ${this.props.userTitle}`}</h1>
          <h2 className="AccountSettings-header2">
            here are your account settings
          </h2>
          <form
            onSubmit={this.props.editFormSubmit}
            className="AccountSettings-form AccountSettings-edit-form"
          >
            <label className="AccountSettings-label" htmlFor="name">
              name
            </label>
            <br></br>
            <input
              className="AccountSettings-input AccountSettings-edit-input"
              type="text"
              name="userName"
              minLength="2"
              pattern="^[A-Za-z]+$"
              value={this.props.userName}
              onChange={this.props.handleAccountInputs}
              required
            />
            <br></br>
            <label className="AccountSettings-label" htmlFor="email">
              email
            </label>
            <br></br>
            <input
              className="AccountSettings-input AccountSettings-edit-input"
              type="email"
              name="userEmail"
              value={this.props.userEmail}
              onChange={this.props.handleAccountInputs}
            />
            <br></br>
            <button
              className="AccountSettings-submit AccountSettings-edit-submit"
              type="submit"
            >
              Edit
            </button>
            {renderRedirect}
          </form>

          <div className="AccountSettings-line-break"></div>
          <h2 className="AccountSettings-header2">
            want to change your password?
          </h2>

          <form
            className="AccountSettings-form AccountSettings-password-form"
            onSubmit={this.props.changePasswordSubmit}
          >
            <label className="AccountSettings-label" htmlFor="userPassword">
              current password
            </label>
            <br></br>
            <input
              className="AccountSettings-input AccountSettings-password-input"
              type="password"
              name="userPassword"
              minLength="8"
              value={this.props.userPassword}
              onChange={this.props.handleAccountInputs}
            />
            <br></br>
            <label className="AccountSettings-label" htmlFor="userNewPassword">
              new password
            </label>
            <br></br>
            <input
              className="AccountSettings-input AccountSettings-password-input"
              type="password"
              name="userNewPassword"
              minLength="8"
              value={this.props.userNewPassword}
              onChange={this.props.handleAccountInputs}
            />
            <br></br>
            <label
              className="AccountSettings-label"
              htmlFor="userConfirmPassword"
            >
              confirm password
            </label>
            <br></br>
            <input
              className="AccountSettings-input AccountSettings-password-input"
              type="password"
              name="userConfirmPassword"
              minLength="8"
              value={this.props.userConfirmPassword}
              onChange={this.props.handleAccountInputs}
            />
            <br></br>
            <button
              className="AccountSettings-submit AccountSettings-passsword-submit"
              type="submit"
            >
              change password
            </button>
          </form>
        </ContentContainer>
      </div>
    );
  }
}

export default AccountSettings;
