import { React, Component } from 'react';
import axios from 'axios';
import './SneakerDirectory.css';
import SneakerGrid from '../shared/SneakerGrid/SneakerGrid';
import SneakerPagination from './SneakerPagination';
import SneakerFilter from './SneakerFilter';
import ContentContainer from '../shared/ContentContainer/ContentContainer';

class SneakerDirectory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sneakers: '',
      sneakerTypes: '',
      totalSneakers: '',
      pageNumber: 1,
    };

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  async componentDidMount() {
    const sneakersInfo = await axios.get(
      `http://localhost:3001/api/v1/sneakers/${this.props.brandDirectory}?page=${this.state.pageNumber}`
    );

    this.setState({
      sneakers: sneakersInfo.data.data.sneakers,
      totalSneakers: sneakersInfo.data.data.totalSneakers,
      sneakerTypes: sneakersInfo.data.data.sneakerTypes[0].brandTypes,
    });
  }

  async sneakerCall() {
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
    this.sneakerCall();
  }

  nextPage() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
    this.sneakerCall();
  }

  renderModelFilterForm() {
    const modelFilterForm = (
      <form>
        {Object.values(this.state.sneakerTypes).map((sneakerType) => (
          <div>
            <input
              type="checkbox"
              id={sneakerType}
              name="type"
              value={sneakerType}
            />
            <label htmlFor={sneakerType}>
              {sneakerType.split('-').join(' ')}
            </label>
          </div>
        ))}
      </form>
    );
    return modelFilterForm;
  }

  render() {
    console.log(this.renderModelFilterForm());
    return (
      <div className="SneakerDirectory">
        <ContentContainer>
          <div className="SneakerDirectory-filters">
            <SneakerFilter buttonName="Model">
              {this.renderModelFilterForm()}
            </SneakerFilter>
          </div>
          <div className="SneakerDirectory-content">
            <SneakerGrid sneakersForDisplay={this.state.sneakers} />
            <SneakerPagination
              totalSneakers={this.state.totalSneakers}
              pageNumber={this.state.pageNumber}
              previousPage={this.previousPage}
              nextPage={this.nextPage}
            />
          </div>
        </ContentContainer>
      </div>
    );
  }
}

export default SneakerDirectory;
