import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from '../ContentContainer/ContentContainer';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.sneakerLinksMouseEnter = this.sneakerLinksMouseEnter.bind(this);
  }

  sneakerLinksMouseEnter(e) {
    console.log(e.target);
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
            onMouseEnter={this.sneakerLinksMouseEnter}
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
