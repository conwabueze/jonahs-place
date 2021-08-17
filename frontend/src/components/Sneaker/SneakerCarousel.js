import { Component } from 'react';
import './SneakerCarousel.css';

class SneakerCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mbMode: false,
    };
  }

  renderMbImgIndicators() {
    const renderIndicator = [];
    for (let x = 0; x < this.props.sneakerImgs.length; x++) {
      if (x === this.props.currentImgIndex) {
        renderIndicator.push(
          <div
            className="SneakerCarousel-mb-indicator active-indicator"
            key={x}
          ></div>
        );
      } else {
        renderIndicator.push(
          <div className="SneakerCarousel-mb-indicator" key={x}></div>
        );
      }
    }
    return renderIndicator;
  }

  carouselRender() {
    const sneakerImgs = this.props.sneakerImgs;
    if (this.props.sneakerImgs.length === 1) {
      return (
        <div className="SneakerCarousel">
          <img
            className="SneakerCarousel-img"
            src={`/imgs/${sneakerImgs[this.props.currentImgIndex]}`}
            alt={sneakerImgs[this.props.currentImgIndex]}
            onClick={this.props.mbMode ? this.props.nextImg : null}
          />
        </div>
      );
    } else {
      return (
        <div className="SneakerCarousel">
          <button
            className="SneakerCarousel-previous"
            onClick={this.props.previousImg}
          >
            {String.fromCharCode(8249)}
          </button>
          <img
            className="SneakerCarousel-img"
            src={`/imgs/${sneakerImgs[this.props.currentImgIndex]}`}
            alt={sneakerImgs[this.props.currentImgIndex]}
            onClick={this.props.mbMode ? this.props.nextImg : null}
          />
          <button className="SneakerCarousel-next" onClick={this.props.nextImg}>
            {String.fromCharCode(8250)}
          </button>
          <div className="SneakerCarousel-mb-indicators">
            {this.renderMbImgIndicators()}
          </div>
        </div>
      );
    }
  }
  render() {
    return this.carouselRender();
  }
}

export default SneakerCarousel;
