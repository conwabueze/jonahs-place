import { React, Component } from 'react';
import axios from 'axios';
import './SneakerDirectory.css';
import SneakerGrid from '../shared/SneakerGrid/SneakerGrid';

class SneakerDirectory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sneakers: '',
    };
  }

  async componentDidMount() {
    const sneakersInfo = await axios.get(
      'http://localhost:3001/api/v1/sneakers/air-jordan'
    );

    this.setState({ sneakers: sneakersInfo.data.data.sneakers });
  }

  renderSneakerGrid() {}

  render() {
    //console.log(this.state.sneakers);
    return (
      <div className="SneakerDirectory">
        <SneakerGrid sneakersForDisplay={this.state.sneakers} />
      </div>
    );
  }
}

export default SneakerDirectory;
