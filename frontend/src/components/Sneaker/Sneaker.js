import { Component } from 'react';
import axios from 'axios';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
import SneakerCarousel from './SneakerCarousel';
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

  render() {
    console.log(this.props.match.params);
    console.log('heyy');
    return (
      <div>
        <ContentContainer>
          <SneakerCarousel sneakerImgs={this.state.sneakerInfo.images} />
        </ContentContainer>
      </div>
    );
  }
}

export default Sneaker;
