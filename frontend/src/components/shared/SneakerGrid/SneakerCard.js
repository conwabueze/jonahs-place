import { Component } from 'react';
import './SneakerCard.css';

class SneakerCard extends Component {
  render() {
    const sneaker = this.props.sneaker;
    return (
      <a className="SneakerCard">
        <div className="SneakerCard-img-container">
          <img className="SneakerCard-img" src={`/imgs/${sneaker.images[0]}`} />
        </div>
        <div className="SneakerCard-details">
          <p className="SneakerCard-details-brand">{sneaker.brand}</p>
          <h2 className="SneakerCard-details-name">{sneaker.name}</h2>
          <p className="SneakerCard-details-price">{`$${sneaker.price}`}</p>
        </div>
      </a>
    );
  }
}

export default SneakerCard;
