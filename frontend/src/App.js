import './App.css';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/shared/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/shared/Footer/Footer';
import SneakerDirectory from './components/SneakerDirectory/SneakerDirectory';
import Sneaker from './components/Sneaker/Sneaker';
import Account from './components/Account/Account';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      newRender: '',
    };

    this.appRerender = this.appRerender.bind(this);
  }
  async componentDidMount() {
    const checkUser = await axios.get(
      'http://localhost:3001/api/v1/users/loggedInUser',
      { withCredentials: true }
    );
    if (checkUser) {
      this.setState({ user: checkUser.data.data.user });
    }
  }

  async componentDidUpdate() {
    if (this.state.user === '') {
      const checkUser = await axios.get(
        'http://localhost:3001/api/v1/users/loggedInUser',
        { withCredentials: true }
      );

      if (checkUser) {
        this.setState({ user: checkUser.data.data.user });
      }
    }
  }

  appRerender() {
    this.setState({ newRender: '' });
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} />

        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact key="air-jordan" path="/sneakers/air-jordan">
            <SneakerDirectory brandDirectory="air-jordan" />
          </Route>

          <Route exact key="nike" path="/sneakers/nike">
            <SneakerDirectory brandDirectory="nike" />
          </Route>

          <Route exact key="adidas" path="/sneakers/adidas">
            <SneakerDirectory brandDirectory="adidas" />
          </Route>

          <Route exact path="/sneakers/:brand/:sneakerID" component={Sneaker} />

          <Route exact key="login" path="/login">
            <Account
              user={this.state.user}
              appRerender={this.appRerender}
              renderLogin={true}
            />
          </Route>

          <Route exact key="account-settings" path="/account-settings">
            <Account
              user={this.state.user}
              appRerender={this.appRerender}
              renderSettings={true}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
