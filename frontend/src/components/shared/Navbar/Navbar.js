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
      activateDropdown: true,
      mobileNavOpen: false,
    };

    this.sneakerLinksMouseOver = this.sneakerLinksMouseOver.bind(this);
    this.sneakerLinksMouseLeave = this.sneakerLinksMouseLeave.bind(this);
    this.toggleMobileNav = this.toggleMobileNav.bind(this);
  }

  //trigger deactivateSneakerLinkDropdown() which will deativate the sneakerLinks dropdown for Desktop if we are in mobile
  componentDidMount() {
    this.deactivateSneakerLinkDropdown();
    window.addEventListener(
      'resize',
      this.deactivateSneakerLinkDropdown.bind(this)
    );
  }

  //remove deactivateSneakerLinkDropdown() resize event listener on unmount
  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.deactivateSneakerLinkDropdown.bind(this)
    );
  }

  //function determines which dropdown information to dropdown in Desktop when hovering over Sneakerlinks
  sneakerLinksMouseOver(e) {
    if (e.target.classList[0] === 'Navbar-sneaker-link') {
      this.setState({ activeDropdown: e.target.classList[1] });
    }
  }

  //function hides dropdown in desktop when you over mouse away from Sneakerlinks
  sneakerLinksMouseLeave(e) {
    if (e.target.parentNode.classList[0] === 'Navbar-sneaker-links') {
      this.setState({ activeDropdown: '' });
    }
  }

  //function checks window width to see if its mobile size and sets the state to deactivate the SneakerDropdown component
  //when in mobile
  deactivateSneakerLinkDropdown() {
    if (window.innerWidth <= 970) this.setState({ activateDropdown: false });
    else this.setState({ activateDropdown: true });
  }

  //render dropdown for Desktop when you hover over Sneakerlink
  renderSneakerLinkDropdown() {
    if (
      this.state.activeDropdown === '' ||
      this.state.activateDropdown === false
    ) {
      return '';
    }
    return <SneakerDropdown dropdownType={this.state.activeDropdown} />;
  }

  // Open/close mobile nav when you click on hamburger button
  toggleMobileNav() {
    this.state.mobileNavOpen === true
      ? this.setState({ mobileNavOpen: false })
      : this.setState({ mobileNavOpen: true });
  }

  render() {
    const displayCartAccountLinks = this.state.mobileNavOpen
      ? 'cart-account-links-open-nav'
      : '';
    const displaySneakerLinks = this.state.mobileNavOpen
      ? 'sneaker-links-open-nav'
      : '';
    return (
      <div className="Navbar">
        <ContentContainer>
          <Link
            to="/"
            className="Navbar-logo Navbar-home-link"
            onClick={this.toggleMobileNav}
          >
            Jonah's Place
          </Link>

          <button className="Navbar-hamburger" onClick={this.toggleMobileNav}>
            {String.fromCharCode(9776)}
          </button>

          <div
            className={`Navbar-sneaker-links ${displaySneakerLinks}`}
            onMouseOver={this.sneakerLinksMouseOver}
            onMouseLeave={this.sneakerLinksMouseLeave}
            onClick={this.toggleMobileNav}
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
            {this.renderSneakerLinkDropdown()}
          </div>
          <div
            className={`Navbar-cart-account-links ${displayCartAccountLinks}`}
          >
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
