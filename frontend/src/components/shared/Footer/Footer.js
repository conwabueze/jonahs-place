import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from '../ContentContainer/ContentContainer';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <ContentContainer>
          <Link to="/" className="Footer-logo">
            Jonah's Place
          </Link>
          <div className="Footer-main-content">
            <ul className="Footer-links">
              <li>
                <Link to="#" className="Footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="Footer-link">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="Footer-link">
                  Stores
                </Link>
              </li>
              <li>
                <Link to="#" className="Footer-link">
                  Contact
                </Link>
              </li>
            </ul>

            <p className="Footer-author">
              {String.fromCharCode(169)} by Chinonso Nwabueze
            </p>
          </div>
        </ContentContainer>
      </div>
    );
  }
}

export default Footer;
