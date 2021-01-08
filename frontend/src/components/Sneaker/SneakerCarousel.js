import { Component } from 'react';
import './SneakerCarousel.css';

class SneakerCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImgIndex: 0,
    };

    this.previousImg = this.previousImg.bind(this);
    this.nextImg = this.nextImg.bind(this);
  }

  previousImg() {
    if (this.state.currentImgIndex === 0)
      this.setState({ currentImgIndex: this.props.sneakerImgs.length - 1 });
    else this.setState({ currentImgIndex: this.state.currentImgIndex - 1 });
  }

  nextImg() {
    if (this.state.currentImgIndex === this.props.sneakerImgs.length - 1)
      this.setState({ currentImgIndex: 0 });
    else this.setState({ currentImgIndex: this.state.currentImgIndex + 1 });
  }

  render() {
    const sneakerImgs = this.props.sneakerImgs;
    return (
      <div className="SneakerCarousel">
        <button className="SneakerCarousel-previous" onClick={this.previousImg}>
          {String.fromCharCode(8249)}
        </button>
        <img
          className="SneakerCarousel-img"
          src={`/imgs/${sneakerImgs[this.state.currentImgIndex]}`}
          alt={sneakerImgs[this.state.currentImgIndex]}
        />
        <button className="SneakerCarousel-next" onClick={this.nextImg}>
          {String.fromCharCode(8250)}
        </button>
      </div>
    );
  }
}

export default SneakerCarousel;
