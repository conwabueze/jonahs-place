import { Component } from 'react';
import axios from 'axios';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
import SneakerCarousel from './SneakerCarousel';
import SneakerDetails from './SneakerDetails';
import SneakerGrid from '../shared/SneakerGrid/SneakerGrid';
import './Sneaker.css';

class Sneaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sneakerInfo: '',
      sneakerRecommendations: '',
    };
  }

  async componentDidMount() {
    const sneakerInfo = await axios.get(
      `http://localhost:3001/api/v1/sneakers/${this.props.match.params.brand}/${this.props.match.params.sneakerID}`
    );

    const sneakerRecommendations = await axios.get(
      `http://localhost:3001/api/v1/sneakers/${this.props.match.params.brand}?limit=8`
    );

    this.setState({
      sneakerInfo: sneakerInfo.data.data.data,
      sneakerRecommendations: sneakerRecommendations.data.data.sneakers,
    });
  }

  renderContent() {
    console.log(this.state.sneakerRecommendations);
    return this.state.sneakerInfo !== '' ? (
      <ContentContainer>
        <div className="Sneaker-main-content">
          <SneakerCarousel sneakerImgs={this.state.sneakerInfo.images} />
          <SneakerDetails details={this.state.sneakerInfo} />
        </div>

        <div className="Sneaker-recommendations">
          <h2 className="Sneaker-recommendations-header">Recommendations</h2>
          <SneakerGrid sneakersForDisplay={this.state.sneakerRecommendations} />
        </div>
      </ContentContainer>
    ) : (
      ''
    );
  }

  render() {
    return <div className="Sneaker">{this.renderContent()}</div>;
  }
}

export default Sneaker;
