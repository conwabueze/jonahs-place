import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from '../ContentContainer/ContentContainer';
import SneakerDropdown from './SneakerDropdown';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDropdown: '',
    };

    this.sneakerLinksMouseOver = this.sneakerLinksMouseOver.bind(this);
    this.sneakerLinksMouseLeave = this.sneakerLinksMouseLeave.bind(this);
  }

  sneakerLinksMouseOver(e) {
    if (e.target.classList[0] === 'Navbar-sneaker-link') {
      this.setState({ activeDropdown: e.target.classList[1] });
    }
  }

  sneakerLinksMouseLeave(e) {
    if (e.target.parentNode.className === 'Navbar-sneaker-links') {
      this.setState({ activeDropdown: '' });
    }
  }

  dropdownRender() {
    if (this.state.activeDropdown === '') {
      return '';
    }
    return <SneakerDropdown dropdownType={this.state.activeDropdown} />;
  }

  render() {
    return (
      <div className="Navbar">
        <ContentContainer>
          <Link to="/" className="Navbar-logo Navbar-home-link">
            Jonah's Place
          </Link>

          <div
            className="Navbar-sneaker-links"
            onMouseOver={this.sneakerLinksMouseOver}
            onMouseLeave={this.sneakerLinksMouseLeave}
          >
            <Link
              to="/sneakers/air-jordan"
              className="Navbar-sneaker-link Navbar-jordan-link"
            >
              Air Jordan
            </Link>
            <Link
              to="/sneakers/nike"
              className="Navbar-sneaker-link Navbar-nike-link"
            >
              Nike
            </Link>
            <Link
              to="/sneakers/adidas"
              className="Navbar-sneaker-link Navbar-adidas-link"
            >
              Adidas
            </Link>
            <Link
              to="/sneakers/new-balance"
              className="Navbar-sneaker-link Navbar-new-balance-link"
            >
              New Balance
            </Link>
            {this.dropdownRender()}
          </div>
          <div className="Navbar-cart-account-links">
            <Link to="#" className="Navbar-cart-account-link Navbar-cart-link">
              <i className="fas fa-shopping-cart fa-sm" />
              <p className="cart-text">Cart</p>
            </Link>
            <div className="Navbar-cart-account-line-break"></div>
            <Link
              to="#"
              className="Navbar-cart-account-link Navbar-account-link"
            >
              Account
            </Link>
          </div>
        </ContentContainer>
      </div>
    );
  }
}

export default Navbar;
