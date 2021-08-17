import { React, Component } from 'react';
import './Home.css';
import ContentContainer from '../shared/ContentContainer/ContentContainer';
import TextOnImg from '../shared/TextOnImg/TextOnImg';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileRenderToggle: false,
    };
  }

  componentDidMount() {
    this.checkForMobileWindowSize();
    window.addEventListener('resize', this.checkForMobileWindowSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.checkForMobileWindowSize.bind(this)
    );
  }

  checkForMobileWindowSize() {
    if (window.innerWidth <= 970) this.setState({ mobileRenderToggle: true });
    else this.setState({ mobileRenderToggle: false });
  }

  renderBottomBanners() {
    if (this.state.mobileRenderToggle === false) {
      return (
        <div className="Home-bottom-banners">
          <TextOnImg
            classAlt="Home-nike-banner"
            imgSrc="/imgs/nike-home-banner.jpg"
            header="nike"
            btnText="shop now"
            linkTo="/sneakers/nike"
          />
          <TextOnImg
            classAlt="Home-adidas-banner"
            imgSrc="/imgs/adidas-home-banner.jpg"
            header="adidas"
            btnText="shop now"
            linkTo="/sneakers/adidas"
          />
          <TextOnImg
            classAlt="Home-nb-banner"
            imgSrc="/imgs/nb-home-banner-2.jpg"
            header="new balance"
            btnText="shop now"
            linkTo="/sneakers/new-balance"
          />
        </div>
      );
    }

    return (
      <div className="Home-bottom-banners-mobile">
        <TextOnImg
          classAlt="Home-nike-banner"
          imgSrc="/imgs/nike-home-banner-mobile.jpg"
          header="nike"
          btnText="shop now"
          linkTo="/sneakers/nike"
        />
        <TextOnImg
          classAlt="Home-adidas-banner"
          imgSrc="/imgs/adidas-home-banner-mobile-2.jpg"
          header="adidas"
          btnText="shop now"
          linkTo="/sneakers/adidas"
        />
        <TextOnImg
          classAlt="Home-nb-banner"
          imgSrc="/imgs/nb-home-banner-mobile-2.jpg"
          header="new balance"
          btnText="shop now"
          linkTo="/sneakers/new-balance"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        <ContentContainer>
          <TextOnImg
            classAlt="Home-jordan-banner"
            imgSrc="/imgs/jordan-home-banner.jpg"
            header="air jordan"
            btnText="shop now"
            linkTo="/sneakers/air-jordan"
          />

          {this.renderBottomBanners()}
        </ContentContainer>
      </div>
    );
  }
}
export default Home;
