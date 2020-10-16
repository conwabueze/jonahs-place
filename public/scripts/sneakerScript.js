const sneakerCarousel = document.querySelector('.sneaker-carousel');
const sneakerCarouselImgs = document.querySelectorAll('.sneaker-carousel-img');
const previousImage = document.querySelector('.previous-image');
const nextImage = document.querySelector('.next-image');
const shippingBtn = document.querySelector('.product-shipping-button');
const shippingDetails = document.querySelector('.shipping-details');

//select the first imgElement from sneakerCarouselImgs and remove the hide class
sneakerCarouselImgs[0].classList.remove('hide-carousel-img');

//Carousel Logic
let currIndex = 0;
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
