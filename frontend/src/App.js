import './App.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/shared/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/shared/Footer/Footer';
import SneakerDirectory from './components/SneakerDirectory/SneakerDirectory';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route
          exact
          path="/sneakers/air-jordan"
          children={<SneakerDirectory />}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
