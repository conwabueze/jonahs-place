import { React, Component } from 'react';
import './SneakerPagination.css';

class SneakerPagination extends Component {
  constructor(props) {
    super(props);
    this.handleNextPage = this.handleNextPage.bind(this);
  }

  handleNextPage() {
    this.props.nextPage();
  }
  render() {
    return (
      <div className="SneakerPagination">
        <button className="SneakerPagination-previous">
          {String.fromCharCode(8592)}
        </button>
        <p className="SneakerPagination-page-data">{`${
          this.props.pageNumber
        }/${Math.ceil(this.props.totalSneakers / 9)}`}</p>
        <button
          className="SneakerPagination-forward"
          onClick={() => this.props.nextPage}
        >
          {String.fromCharCode(8594)}
        </button>
      </div>
    );
  }
}

export default SneakerPagination;
