import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import './CallToActionBtn.css';

class CallToActionBtn extends Component {
  render() {
    return (
      <Link className="CallToActionBtn" to={this.props.linkTo}>
        {this.props.btnText}
      </Link>
    );
  }
}

export default CallToActionBtn;
