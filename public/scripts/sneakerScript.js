const sneakerCarousel = document.querySelector('.sneaker-carousel');
const sneakerCarouselImgs = document.querySelectorAll('.sneaker-carousel-img');
const previousImage = document.querySelector('.previous-image');
const nextImage = document.querySelector('.next-image');
const shippingBtn = document.querySelector('.product-shipping-button');
const shippingDetails = document.querySelector('.shipping-details');
const mDetailsName = document.querySelector('.mobile-sneaker-details-name');
const mDetailsPrice = document.querySelector('.mobile-sneaker-details-price');
const detailsName = document.querySelector('.sneaker-details-name');
const detailsPrice = document.querySelector('.sneaker-details-price');
const sizeGrid = document.querySelector('.size-grid');
const sizeDropdown = document.querySelector('.size-dropdown-container');
const carouselStates = document.querySelectorAll('.carousel-state');
let currIndex = 0;

//select the first imgElement from sneakerCarouselImgs and remove the hide class
sneakerCarouselImgs[0].classList.remove('hide-carousel-img');

//Carousel Logic
sneakerCarousel.addEventListener('click', (e) => {
  //if user clicks back buttone
  if (e.target.className.includes('previous-image')) {
    sneakerCarouselImgs[currIndex].classList.add('hide-carousel-img');
    if (currIndex === 0) {
      sneakerCarouselImgs[sneakerCarouselImgs.length - 1].classList.remove(
        'hide-carousel-img'
      );
      currIndex = sneakerCarouselImgs.length - 1;
      return;
    } else
      sneakerCarouselImgs[currIndex - 1].classList.remove('hide-carousel-img');

    currIndex--;
  }
  //if user clicks next button
  else if (e.target.className.includes('next-image')) {
    sneakerCarouselImgs[currIndex].classList.add('hide-carousel-img');
    if (currIndex === sneakerCarouselImgs.length - 1) {
      sneakerCarouselImgs[0].classList.remove('hide-carousel-img');
      currIndex = 0;
      return;
    } else
      sneakerCarouselImgs[currIndex + 1].classList.remove('hide-carousel-img');

    currIndex++;
  }
});

//Shipping and Return Toggle
shippingBtn.addEventListener('click', (e) => {
  if (shippingDetails.className.includes('open-shipping-details')) {
    shippingDetails.classList.remove('open-shipping-details');
  } else {
    shippingDetails.classList.add('open-shipping-details');
  }
});

// Mobile Funcitionality
const mobileCarousel = () => {
  carouselStates[currIndex].classList.add('curr-carousel-state');
  sneakerCarousel.addEventListener('click', (e) => {
    sneakerCarouselImgs[currIndex].classList.add('hide-carousel-img');
    carouselStates[currIndex].classList.remove('curr-carousel-state');
    if (currIndex === sneakerCarouselImgs.length - 1) {
      sneakerCarouselImgs[0].classList.remove('hide-carousel-img');
      carouselStates[0].classList.add('curr-carousel-state');
      currIndex = 0;
      return;
    } else {
      sneakerCarouselImgs[currIndex + 1].classList.remove('hide-carousel-img');
      carouselStates[currIndex + 1].classList.add('curr-carousel-state');
    }
    currIndex++;
  });
};

//Hiding and Revealing neccessary elements
if (window.innerWidth < 970) {
  mDetailsName.classList.add('display-mb-header');
  mDetailsPrice.classList.add('display-mb-header');
  detailsName.classList.add('hide-dt-header');
  detailsPrice.classList.add('hide-dt-header');
  sizeGrid.classList.add('hide-size-grid');
  sizeDropdown.classList.add('display-size-dropdown');
  previousImage.classList.add('hide-sneaker-carousel');
  nextImage.classList.add('hide-sneaker-carousel');
  mobileCarousel();
}

window.addEventListener('resize', (e) => {
  if (window.innerWidth < 970) {
    mDetailsName.classList.add('display-mb-header');
    mDetailsPrice.classList.add('display-mb-header');
    detailsName.classList.add('hide-dt-header');
    detailsPrice.classList.add('hide-dt-header');
    sizeGrid.classList.add('hide-size-grid');
    sizeDropdown.classList.add('display-size-dropdown');
    previousImage.classList.add('hide-sneaker-carousel');
    nextImage.classList.add('hide-sneaker-carousel');
    mobileCarousel();
  } else {
    mDetailsName.classList.remove('display-mb-header');
    mDetailsPrice.classList.remove('display-mb-header');
    detailsName.classList.remove('hide-dt-header');
    detailsPrice.classList.remove('hide-dt-header');
    sizeGrid.classList.remove('hide-size-grid');
    sizeDropdown.classList.remove('display-size-dropdown');
    previousImage.classList.remove('hide-sneaker-carousel');
    nextImage.classList.remove('hide-sneaker-carousel');
  }
});
