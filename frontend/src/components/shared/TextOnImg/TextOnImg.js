import { React, Component } from 'react';
import './TextOnImg.css';
import CallToActionBtn from '../CallToActionBtn/CallToActionBtn';

class TextOnImg extends Component {
  render() {
    return (
      <div className={`TextOnImg ${this.props.classAlt}`}>
        <img
          className="TextOnImg-img"
          src={this.props.imgSrc}
          alt={this.props.imgAlt}
        />
        <div className="TextOnImg-txt">
          <h1 className="TextOnImg-txt-h1">{this.props.header}</h1>
          <CallToActionBtn
            btnText={this.props.btnText}
            linkTo={this.props.linkTo}
          />
        </div>
      </div>
    );
  }
}

export default TextOnImg;
