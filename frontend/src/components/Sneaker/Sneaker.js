import { Component } from 'react';
import axios from 'axios';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
import SneakerCarousel from './SneakerCarousel';
import SneakerDetails from './SneakerDetails';
import './Sneaker.css';

class Sneaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sneakerInfo: '',
    };
  }

  async componentDidMount() {
    const sneakerInfo = await axios.get(
      `http://localhost:3001/api/v1/sneakers/${this.props.match.params.brand}/${this.props.match.params.sneakerID}`
    );

    this.setState({ sneakerInfo: sneakerInfo.data.data.data });
  }

  renderContent() {
    return this.state.sneakerInfo !== '' ? (
      <div className="Sneaker-main-content">
        <SneakerCarousel sneakerImgs={this.state.sneakerInfo.images} />
        <SneakerDetails details={this.state.sneakerInfo} />
      </div>
    ) : (
      ''
    );
  }

  render() {
    return (
      <div className="Sneaker">
        <ContentContainer>{this.renderContent()}</ContentContainer>
      </div>
    );
  }
}

export default Sneaker;
