import { React, Component } from 'react';
import axios from 'axios';
import './SneakerDirectory.css';
import SneakerGrid from '../shared/SneakerGrid/SneakerGrid';
import SneakerPagination from './SneakerPagination';
import SneakerFilter from './SneakerFilter';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
const apiUrl = 'https://jonahsplace.herokuapp.com/api/v1';

class SneakerDirectory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sneakers: '',
      sneakerTypes: '',
      totalSneakers: '',
      pageNumber: 1,
      checkedModelFilter: [],
      sneakerSizes: '',
      checkedSizeFilter: [],
      startingPrice: '',
      endingPrice: '',
      priceSubmit: false,
      mobileFilterOpen: false,
    };

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.checkBoxOnChange = this.checkBoxOnChange.bind(this);
    this.priceFilterOnSubmit = this.priceFilterOnSubmit.bind(this);
    this.handlePriceFilterInput = this.handlePriceFilterInput.bind(this);
    this.toggleMobileFilters = this.toggleMobileFilters.bind(this);
  }

  async componentDidMount() {
    const sneakersInfo = await axios.get(
      `${apiUrl}/sneakers/${this.props.brandDirectory}?page=${this.state.pageNumber}`
    );

    console.log(sneakersInfo)
    this.setState({
      sneakers: sneakersInfo.data.data.sneakers,
      totalSneakers: sneakersInfo.data.data.totalSneakers,
      sneakerTypes: sneakersInfo.data.data.sneakerTypes[0].brandTypes,
      sneakerSizes: sneakersInfo.data.data.sneakerSizes,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.pageNumber !== this.state.pageNumber ||
      prevState.checkedModelFilter !== this.state.checkedModelFilter ||
      prevState.checkedSizeFilter !== this.state.checkedSizeFilter ||
      this.state.priceSubmit
    ) {
      let brandQuery = '';
      this.state.checkedModelFilter.forEach(
        (model) => (brandQuery += `&type=${model}`)
      );
      let sizeQuery = '';
      this.state.checkedSizeFilter.forEach(
        (size) => (sizeQuery += `&size=${size}`)
      );
      let priceQuery = '';
      priceQuery = `&priceFrom=${this.state.startingPrice}&priceTo=${this.state.endingPrice}`;

      const sneakersInfo = await axios.get(
        `${apiUrl}/sneakers/${this.props.brandDirectory}?page=${this.state.pageNumber}${brandQuery}${sizeQuery}${priceQuery}`
      );

      this.setState({
        sneakers: sneakersInfo.data.data.sneakers,
        totalSneakers: sneakersInfo.data.data.totalSneakers,
        priceSubmit: false,
      });
    }
  }

  previousPage() {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  }

  nextPage() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  checkBoxOnChange(e) {
    const filterClassName = e.target.parentNode.parentNode.className;
    if (filterClassName === 'ModelFilter') {
      const checkedModelFilter = [...this.state.checkedModelFilter];

      if (checkedModelFilter.includes(e.target.id)) {
        checkedModelFilter.splice(checkedModelFilter.indexOf(e.target.id), 1);
      } else {
        checkedModelFilter.push(e.target.id);
      }

      this.setState({ checkedModelFilter: checkedModelFilter });
    } else if (filterClassName === 'SizeFilter') {
      const checkedSizeFilter = [...this.state.checkedSizeFilter];

      if (checkedSizeFilter.includes(e.target.id)) {
        checkedSizeFilter.splice(checkedSizeFilter.indexOf(e.target.id), 1);
      } else {
        checkedSizeFilter.push(e.target.id);
      }

      this.setState({ checkedSizeFilter: checkedSizeFilter });
    }
  }

  handlePriceFilterInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  priceFilterOnSubmit(e) {
    this.setState({ priceSubmit: true });
    this.toggleMobileFilters();

    e.preventDefault();
  }

  toggleMobileFilters() {
    if (this.state.mobileFilterOpen) this.setState({ mobileFilterOpen: false });
    else this.setState({ mobileFilterOpen: true });
  }

  renderModelFilterForm() {
    const modelFilterForm = (
      <form className="ModelFilter" onChange={this.checkBoxOnChange}>
        {Object.values(this.state.sneakerTypes).map((sneakerType) => (
          <div key={sneakerType}>
            <input
              type="checkbox"
              id={sneakerType}
              name="type"
              value={sneakerType}
            />
            <label className="ModelFilter-label" htmlFor={sneakerType}>
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

  renderSizeFilterForm() {
    const sizeFilterForm = (
      <form className="SizeFilter" onChange={this.checkBoxOnChange}>
        {Object.values(this.state.sneakerSizes).map((size) => (
          <div key={Object.values(size._id)[0]}>
            <input
              type="checkbox"
              id={Object.values(size._id)[0]}
              name="size"
              value={Object.values(size._id)[0]}
            />
            <label
              className="SizeFilter-label"
              htmlFor={Object.values(size._id)[0]}
            >
              {Object.values(size._id)[0]}
              <span className="SizeFilter-label-count">{`(${size.count})`}</span>
            </label>
          </div>
        ))}
      </form>
    );
    return sizeFilterForm;
  }

  renderPriceFilterForm() {
    const priceFilterForm = (
      <form className="PriceFilter">
        <label className="PriceFilter-label" id="startingPrice">
          From:
        </label>
        <input
          type="number"
          className="PriceFilter-input"
          htmlFor="startingPrice"
          name="startingPrice"
          value={this.state.startingPrice}
          onChange={this.handlePriceFilterInput}
        />
        <br></br>
        <label className="PriceFilter-label" id="endingPrice">
          To:
        </label>
        <input
          type="number"
          className="PriceFilter-input"
          htmlFor="endingPrice"
          name="endingPrice"
          value={this.state.endingPrice}
          onChange={this.handlePriceFilterInput}
        />
        <button
          className="PriceFilter-button"
          onClick={this.priceFilterOnSubmit}
        >
          Submit
        </button>
      </form>
    );

    return priceFilterForm;
  }

  render() {
    const mobileFilterClassActive = this.state.mobileFilterOpen
      ? 'open-mobile-filters'
      : '';
    return (
      <div className="SneakerDirectory">
        <ContentContainer>
          <button
            className="SneakerDirectory-filters-toggle"
            onClick={this.toggleMobileFilters}
          >
            <p>Open Filters</p>
          </button>
          <div
            className={`SneakerDirectory-filters ${mobileFilterClassActive}`}
          >
            <button
              className="SneakerDirectory-filters-mb-exitBtn"
              onClick={this.toggleMobileFilters}
            >
              {String.fromCharCode(9747)}
            </button>
            <SneakerFilter buttonName="Model">
              {this.renderModelFilterForm()}
            </SneakerFilter>

            <SneakerFilter buttonName="Size">
              {this.renderSizeFilterForm()}
            </SneakerFilter>

            <SneakerFilter buttonName="Price">
              {this.renderPriceFilterForm()}
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
