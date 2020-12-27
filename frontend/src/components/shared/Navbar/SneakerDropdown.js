import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import './SneakerDropdown.css';

class SneakerDropdown extends Component {
  dropdownOptions(brand) {
    const dropdownOptions = {
      'Navbar-jordan-link': [
        'Air Jordan 1',
        'Air Jordan 2',
        'Air Jordan 3',
        'Air Jordan 4',
        'Air Jordan 5',
        'Air Jordan 7',
      ],
      'Navbar-nike-link': [
        'Air Max',
        'Air Force 1',
        'Blazer',
        'Kobe Bryant',
        'Kyrie Irving',
        'Kevin Durant',
      ],
      'Navbar-adidas-link': ['Yeezy', 'Ultra Boost', 'Superstar'],
      'Navbar-new-balance-link': ['990', '574', '1500'],
    };

    return dropdownOptions[brand];
  }

  renderDropdown() {
    const dropdownLinks = this.dropdownOptions(this.props.dropdownType);

    return dropdownLinks.map((link) => (
      <Link to="#" key={link} className="SneakerDropdown-link">
        {link}
      </Link>
    ));
  }

  render() {
    return <div className="SneakerDropdown">{this.renderDropdown()}</div>;
  }
}

export default SneakerDropdown;
