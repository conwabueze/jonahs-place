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
      checkedModelFilter: [],
    };

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.checkBoxOnChange = this.checkBoxOnChange.bind(this);
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

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('outside yerr');
    if (
      prevState.pageNumber !== this.state.pageNumber ||
      prevState.checkedModelFilter !== this.state.checkedModelFilter
    ) {
      console.log('yerr');
      const sneakersInfo = await axios.get(
        `http://localhost:3001/api/v1/sneakers/${
          this.props.brandDirectory
        }?page=${
          this.state.pageNumber
        }&type=${this.state.checkedModelFilter.join(',')}`
      );

      this.setState({
        sneakers: sneakersInfo.data.data.sneakers,
        totalSneakers: sneakersInfo.data.data.totalSneakers,
      });
    }
  }

  previousPage() {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
    //this.sneakerCall();
  }

  nextPage() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
    //this.sneakerCall();
  }

  checkBoxOnChange(e) {
    const checkedModelFilter = this.state.checkedModelFilter;

    if (checkedModelFilter.includes(e.target.id)) {
      checkedModelFilter.splice(checkedModelFilter.indexOf(e.target.id), 1);
    } else {
      checkedModelFilter.push(e.target.id);
    }

    console.log(this.state.checkedModelFilter.join(','));
    this.setState({ checkedModelFilter: checkedModelFilter });
  }

  renderModelFilterForm() {
    const modelFilterForm = (
      <form onChange={this.checkBoxOnChange}>
        {Object.values(this.state.sneakerTypes).map((sneakerType) => (
          <div key={sneakerType}>
            <input
              type="checkbox"
              id={sneakerType}
              name="type"
              value={sneakerType}
            />
            <label htmlFor={sneakerType}>
              {this.spaceCapSneakerBrand(sneakerType)}
            </label>
          </div>
        ))}
      </form>
    );
    return modelFilterForm;
  }

  //helper method for renderModelFilterForm() to help format sneaker brandType
  spaceCapSneakerBrand(brandType) {
    let typeSplit = brandType.split('-');
    typeSplit = typeSplit.map(
      (type) => type.substring(0, 1).toUpperCase() + type.substring(1)
    );
    return typeSplit.join(' ');
  }

  render() {
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
