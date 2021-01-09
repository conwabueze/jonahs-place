import { Component } from 'react';
import './ShippingDetails.css';

class ShippingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleOpenClose: false,
    };

    this.openClose = this.openClose.bind(this);
  }

  openClose() {
    this.state.toggleOpenClose
      ? this.setState({ toggleOpenClose: false })
      : this.setState({ toggleOpenClose: true });
  }

  render() {
    const showDetails = this.state.toggleOpenClose
      ? 'show-ShippingDetails'
      : '';
    return (
      <div className="ShippingDetails">
        <button className="ShippingDetails-button" onClick={this.openClose}>
          <p className="ShippingDetails-button-header">shipping returns</p>
          <img
            className="ShippingDetails-button-icon"
            src="/imgs/dropdown-icon.png"
            alt="dropdown-icon"
          />
        </button>

        <div className={`ShippingDetails-details ${showDetails}`}>
          <h4 className="ShippingDetails-details-header">Delivery</h4>
          <p className="ShippingDetails-details-p">
            Delivery and processing speeds vary by pricing options. "Lowest
            Price" orders ship to Jonah's Place first for verification and
            typically take 7-9 days (M-F) to reach you. "Fastest To You" orders
            will be shipped out the same day if ordered by 2PM ET (M-F,
            excluding holidays) and typically take 1-4 days (M-F) to reach you.
          </p>
          <p className="ShippingDetails-details-p">
            Estimated delivery times do not apply to international orders.
            International customers are responsible for any additional fees or
            taxes after an item ships.
          </p>
          <h4 className="ShippingDetails-details-header">Returns</h4>
          <p className="ShippingDetails-details-p">
            All sales with Jonah's Place are final.
          </p>
        </div>
      </div>
    );
  }
}

export default ShippingDetails;
