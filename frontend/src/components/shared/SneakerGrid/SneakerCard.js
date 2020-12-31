import { Component } from 'react';
import { Link } from 'react-router-dom';
import './SneakerCard.css';

class SneakerCard extends Component {
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
          <p className="SneakerCard-details-brand">{sneaker.brand}</p>
          <h2 className="SneakerCard-details-name">{sneaker.name}</h2>
          <p className="SneakerCard-details-price">{`$${sneaker.price}`}</p>
        </div>
      </Link>
    );
  }
}

export default SneakerCard;
