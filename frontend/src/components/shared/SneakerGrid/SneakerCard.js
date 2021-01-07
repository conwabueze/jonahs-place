import { Component } from 'react';
import { Link } from 'react-router-dom';
import './SneakerCard.css';

class SneakerCard extends Component {
  reformateBrand(brand) {
    let brandSplit = brand.split('-');
    brandSplit = brandSplit.map(
      (brand) => brand.substring(0, 1).toUpperCase() + brand.substring(1)
    );
    return brandSplit.join(' ');
  }

  render() {
    const sneaker = this.props.sneaker;
    return (
      <Link className="SneakerCard" to="#">
        <div className="SneakerCard-img-container">
          <img
            className="SneakerCard-img"
            src={`/imgs/${sneaker.images[0]}`}
            alt={sneaker.name}
          />
        </div>
        <div className="SneakerCard-details">
          <p className="SneakerCard-details-brand">
            {this.reformateBrand(sneaker.brand)}
          </p>
          <h2 className="SneakerCard-details-name">{sneaker.name}</h2>
          <p className="SneakerCard-details-price">{`$${sneaker.price}`}</p>
        </div>
      </Link>
    );
  }
}

export default SneakerCard;
