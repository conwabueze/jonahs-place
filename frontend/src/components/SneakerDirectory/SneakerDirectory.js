import { React, Component } from 'react';
import axios from 'axios';
import './SneakerDirectory.css';
import SneakerGrid from '../shared/SneakerGrid/SneakerGrid';
import SneakerPagination from './SneakerPagination';

class SneakerDirectory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sneakers: '',
      totalSneakers: '',
      pageNumber: 1,
    };

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage(this);
  }

  async componentDidMount() {
    const sneakersInfo = await axios.get(
      `http://localhost:3001/api/v1/sneakers/${this.props.brandDirectory}?page=${this.state.pageNumber}`
    );

    this.setState({
      sneakers: sneakersInfo.data.data.sneakers,
      totalSneakers: sneakersInfo.data.data.totalSneakers,
    });
  }

  previousPage() {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  }

  nextPage() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  render() {
    //console.log(this.state.sneakers);
    return (
      <div className="SneakerDirectory">
        <SneakerGrid sneakersForDisplay={this.state.sneakers} />
        <SneakerPagination
          totalSneakers={this.state.totalSneakers}
          pageNumber={this.state.pageNumber}
          previousPage={this.previousPage}
          nextPage={() => this.nextPage}
        />
      </div>
    );
  }
}

export default SneakerDirectory;
