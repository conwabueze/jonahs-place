import { Component } from 'react';
import SneakerCard from './SneakerCard';
import './SneakerGrid.css';

class SneakerGrid extends Component {
  render() {
    const sneakersForDisplay = this.props.sneakersForDisplay;
    console.log(Object.values(sneakersForDisplay).map((s) => s));
    return (
      <div className="SneakerGrid">
        {Object.values(sneakersForDisplay).map((sneaker) => (
          <SneakerCard sneaker={sneaker} />
        ))}
      </div>
    );
  }
}

export default SneakerGrid;
