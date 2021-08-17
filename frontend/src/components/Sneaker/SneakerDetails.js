import { Component } from 'react';
import CallToActionBtn from '../shared/CallToActionBtn/CallToActionBtn';
import ShippingDetails from './ShippingDetails';
import './SneakerDetails.css';

class SneakerDetails extends Component {
  render() {
    const details = this.props.details;
    const renderOptions = Object.keys(details.sizesAndQuantity).map((size) => (
      <option key={size} value={size}>
        {size}
      </option>
    ));
    const getDate = new Date(details.dateReleased);
    return (
      <div className="SneakerDetails">
        <h1 className="SneakerDetails-name">{details.name}</h1>
        <h2 className="SneakerDetails-price">{`$${details.price}`}</h2>
        <form className="SneakerDetails-size-form">
          <p className="SneakerDetails-size-form-title">select size</p>
          <select className="SneakerDetails-size-form-select">
            {renderOptions}
          </select>
          <CallToActionBtn btnText="ADD TO CART" />
        </form>

        <div className="SneakerDetails-linebreak"></div>

        <div className="SneakerDetails-summary">
          <h1 className="SneakerDetails-summary-title">about this product</h1>
          <p className="SneakerDetails-summary-description">
            {details.description}
          </p>
          <p className="SneakerDetails-summary-other">{`Product Code: ${details.productCode}`}</p>
          <p className="SneakerDetails-summary-other">{`Color: ${details.color}`}</p>
          <p className="SneakerDetails-summary-other">{`Release Date: ${getDate.getMonth()}/${getDate.getDate()}/${getDate.getFullYear()}`}</p>
        </div>

        <div className="SneakerDetails-linebreak"></div>

        <ShippingDetails />

        <div className="SneakerDetails-linebreak"></div>
      </div>
    );
  }
}

export default SneakerDetails;
