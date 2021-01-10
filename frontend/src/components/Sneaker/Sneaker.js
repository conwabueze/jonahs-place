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
      sneakerID: this.props.match.params.sneakerID,
      sneakerInfo: '',
      sneakerRecommendations: '',
      currentImgIndex: 0,
      mbMode: false,
    };

    this.previousImg = this.previousImg.bind(this);
    this.nextImg = this.nextImg.bind(this);
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

    this.checkScreenForMbMode();
    window.addEventListener('resize', this.checkScreenForMbMode.bind(this));
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.sneakerID !== this.state.sneakerID) {
      const sneakerInfo = await axios.get(
        `http://localhost:3001/api/v1/sneakers/${this.props.match.params.brand}/${this.props.match.params.sneakerID}`
      );
      const sneakerRecommendations = await axios.get(
        `http://localhost:3001/api/v1/sneakers/${this.props.match.params.brand}?limit=8`
      );

      this.setState({
        sneakerInfo: sneakerInfo.data.data.data,
        sneakerRecommendations: sneakerRecommendations.data.data.sneakers,
        sneakerID: this.props.match.params.sneakerID,
        currentImgIndex: 0,
      });
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreenForMbMode.bind(this));
  }

  checkScreenForMbMode() {
    if (window.innerWidth <= 970) this.setState({ mbMode: true });
    else this.setState({ mbMode: false });
  }

  previousImg() {
    if (this.state.currentImgIndex === 0)
      this.setState({
        currentImgIndex: this.state.sneakerInfo.images.length - 1,
      });
    else
      this.setState({
        currentImgIndex: this.state.currentImgIndex - 1,
      });
  }

  nextImg() {
    if (this.state.currentImgIndex === this.state.sneakerInfo.images.length - 1)
      this.setState({ currentImgIndex: 0 });
    else this.setState({ currentImgIndex: this.state.currentImgIndex + 1 });
  }

  renderContent() {
    return this.state.sneakerInfo !== '' ? (
      <ContentContainer>
        <div className="Sneaker-main-content">
          <SneakerCarousel
            sneakerImgs={this.state.sneakerInfo.images}
            currentImgIndex={this.state.currentImgIndex}
            previousImg={this.previousImg}
            nextImg={this.nextImg}
            mbMode={this.state.mbMode}
          />
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
