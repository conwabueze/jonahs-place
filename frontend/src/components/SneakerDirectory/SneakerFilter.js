import { React, Component } from 'react';
import './SneakerFilter.css';

class SneakerFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      revealFilterOptions: false,
    };

    this.revealFilter = this.revealFilter.bind(this);
  }

  revealFilter() {
    console.log('heyy');
    this.state.revealFilterOptions
      ? this.setState({ revealFilterOptions: false })
      : this.setState({ revealFilterOptions: true });
  }

  render() {
    const openCloseOptions = this.state.revealFilterOptions
      ? 'showFilterOptions'
      : '';
    return (
      <div className="SneakerFilter">
        <button className="SneakerFilter-button" onClick={this.revealFilter}>
          <p className="SneakerFilter-button-name">{this.props.buttonName}</p>
          <img
            className="SneakerFilter-button-icon"
            src="/imgs/dropdown-icon.png"
            alt="dropdown-icon"
          />
        </button>
        <div className={`SneakerFilter-options ${openCloseOptions}`}></div>
      </div>
    );
  }
}

export default SneakerFilter;
