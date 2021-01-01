import { React, Component } from 'react';
import './SneakerPagination.css';

class SneakerPagination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderPreviousButton =
      this.props.pageNumber === 1 ? (
        ''
      ) : (
        <button
          className="SneakerPagination-previous"
          onClick={this.props.previousPage}
        >
          {String.fromCharCode(8592)}
        </button>
      );

    const renderForwardButton =
      this.props.pageNumber === Math.ceil(this.props.totalSneakers / 9) ? (
        ''
      ) : (
        <button
          className="SneakerPagination-forward"
          onClick={this.props.nextPage}
        >
          {String.fromCharCode(8594)}
        </button>
      );
    return (
      <div className="SneakerPagination">
        {renderPreviousButton}
        <p className="SneakerPagination-page-data">{`${
          this.props.pageNumber
        }/${Math.ceil(this.props.totalSneakers / 9)}`}</p>
        {renderForwardButton}
      </div>
    );
  }
}

export default SneakerPagination;
