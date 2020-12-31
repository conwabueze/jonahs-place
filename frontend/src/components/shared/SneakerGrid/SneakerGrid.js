import { Component } from 'react';
import SneakerCard from './SneakerCard';
import './SneakerGrid.css';

class SneakerGrid extends Component {
  render() {
    const sneakersForDisplay = this.props.sneakersForDisplay;
    return (
      <div className="SneakerGrid">
        {Object.values(sneakersForDisplay).map((sneaker) => (
          <SneakerCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </div>
    );
  }
}

export default SneakerGrid;
