import { Component } from 'react';
import Login from './Login';
import ContentContainer from '../shared/ContentContainer/ContentContainer';

class Account extends Component {
  render() {
    return (
      <ContentContainer>
        <Login />
      </ContentContainer>
    );
  }
}

export default Account;
