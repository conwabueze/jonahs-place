if (document.querySelector('body').className === 'sneakers-overview-body') {
  //sneaker-pagination funtionality
  const pageData = document.querySelector('.page-data').innerText;
  const currentPage = pageData.split('/')[0] * 1;
  const pageLimit = pageData.split('/')[1] * 1;

  const previousResult = document.querySelector('.previous-result');
  const forwardResult = document.querySelector('.forward-result');

  if (pageLimit === 1) {
    previousResult.classList.add('hide-result-button');
    forwardResult.classList.add('hide-result-button');
  }
  //if pagelimit is equal to 1 hide both buttons
  else if (currentPage === 1) {
    previousResult.classList.add('hide-result-button');
  }

  //if currentPage === pageLimit forward-result button
  else if (currentPage === pageLimit) {
    forwardResult.classList.add('hide-result-button');
  }

  //Take response from button and add value to invisible input in form
  const sneakerPagination = document.querySelector('.sneaker-pagination');
  sneakerPagination.addEventListener('click', (e) => {
    const pageInput = document.querySelector('.page-input');
    if (e.target.className === 'previous-result') {
      pageInput.value = currentPage - 1;
      pageInput.setAttribute('name', 'page');
      submitFilter.submit();
    }
    if (e.target.className === 'forward-result') {
      pageInput.value = currentPage + 1;
      pageInput.setAttribute('name', 'page');
      submitFilter.submit();
    }
  });

  const sneakerFilter = document.querySelector('.sneaker-filter');

  //Sneaker filter toggle
  sneakerFilter.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'sneaker-filter-option') {
      const filterOption = document.querySelector(`#${e.target.classList[1]}`);
      if (filterOption.className.includes('close-filter-options')) {
        filterOption.className = filterOption.className.replace(
          'close-filter-options',
          'open-filter-options'
        );
      } else {
        filterOption.className = filterOption.className.replace(
          'open-filter-options',
          'close-filter-options'
        );
      }
    }
  });

  //checkbox set persisted data on reload/keep checkbox open if
  const checkboxValues =
    JSON.parse(localStorage.getItem('checkboxValues')) || {};
  const checkboxes = document.querySelectorAll(
    ".sneaker-filter input[type='checkbox']"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = checkboxValues[checkbox.id];

    //if a box is checked in one of the filter keep that filter open
    if (checkbox.checked === true) {
      if (checkbox.parentElement.className.includes('close-filter-options')) {
        checkbox.parentElement.className = checkbox.parentElement.className.replace(
          'close-filter-options',
          'open-filter-options'
        );
      }
    }
  });

  //pricing set persisted data on reload/keep price filter open if being used
  const priceValues = JSON.parse(localStorage.getItem('priceValues')) || [];
  const priceInputs = document.querySelectorAll('.price-input');
  if (priceValues.from) {
    priceInputs[0].value = priceValues.from;
  }
  if (priceValues.to) {
    priceInputs[1].value = priceValues.to;
  }
  if (priceValues.from || priceValues.to) {
    const priceOptions = document.querySelector('#price-options');
    priceOptions.className = priceOptions.className.replace(
      'close-filter-options',
      'open-filter-options'
    );
  }

  //Prevent users form submitting pricing form by hitting enter
  priceInputs.forEach((label) => {
    label.addEventListener('keypress', (e) => {
      //13 is keycode for Enter button
      if (e.keyCode == 13) e.preventDefault();
    });
  });

  const submitFilter = document.querySelector('.filter-submission');

  //price submit function
  let persistedPriceValues = {};
  const submitPricing = () => {
    priceInputs[0].setAttribute('name', 'priceFrom');
    priceInputs[1].setAttribute('name', 'priceTo');
    persistedPriceValues = {
      from: priceInputs[0].value,
      to: priceInputs[1].value,
    };
    localStorage.setItem('priceValues', JSON.stringify(persistedPriceValues));
    submitFilter.submit();
  };

  const showPricingError = (errMsg) => {
    const priceError = document.querySelector('.price-error');
    priceError.innerHTML = `Error: ${errMsg}`;
    priceError.className = priceError.className.replace('close', 'open');

    priceInputs.forEach((input) => {
      input.classList.add('price-input-error');
    });
  };

  const priceSubmitBtn = document.querySelector('.price-submit');
  if (window.innerWidth > 970) {
    //checkbox capture persist data and submit
    sneakerFilter.addEventListener('change', (e) => {
      if (
        e.target.parentElement.className.includes('filter-options') &&
        e.target.type === 'checkbox'
      ) {
        checkboxes.forEach((checkbox) => {
          checkboxValues[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));

        //submit all forms/filter

        submitFilter.submit();
      }
    });

    //Pricing filter submit logic

    //check if both input fields are filled before adding name parameter to inputs upon submission

    priceSubmitBtn.addEventListener('click', (e) => {
      if (
        (Number.isNaN(parseInt(priceInputs[0].value)) &&
          priceInputs[0].value !== '') ||
        (Number.isNaN(parseInt(priceInputs[1].value)) &&
          priceInputs[1].value !== '')
      ) {
        showPricingError('Please make sure both fields are numbers');
        return;
      }

      //if no values are entered at all
      if (!priceInputs[0].value && !priceInputs[1].value) {
        showPricingError('At least one or both fields should be filled out');
        return;
      }
      //If both values are filled out check if the starting price is less than the
      //ending price
      if (priceInputs[0].value && priceInputs[1].value) {
        if (priceInputs[0].value <= priceInputs[1].value) {
          submitPricing();
        } else {
          showPricingError('Ending price must be greater than starting price');
          return;
        }
      }

      //check is on or the other values is filled
      if (priceInputs[0].value && !priceInputs[1].value) {
        priceInputs[0].setAttribute('name', 'priceFrom');
        persistedPriceValues = { from: priceInputs[0].value };
        localStorage.setItem(
          'priceValues',
          JSON.stringify(persistedPriceValues)
        );
        submitFilter.submit();
      } else if (!priceInputs[0].value && priceInputs[1].value) {
        priceInputs[1].setAttribute('name', 'priceTo');
        persistedPriceValues = { to: priceInputs[1].value };
        localStorage.setItem(
          'priceValues',
          JSON.stringify(persistedPriceValues)
        );
        submitFilter.submit();
      }
    });
  } else {
    //hide price submit button
    priceSubmitBtn.classList.add('close-price-submit');
    /*
    In the mobile version the user has to click the view filters button for all data
    to be persisted into local storage and submitted
    */

    const mobileFilterSubmit = document.querySelector('.mobile-filter-submit');

    mobileFilterSubmit.addEventListener('click', (e) => {
      //checkbox capture persist data
      checkboxes.forEach((checkbox) => {
        checkboxValues[checkbox.id] = checkbox.checked;
      });
      localStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));

      if (priceInputs[0].value || priceInputs[1].value) {
        if (
          (Number.isNaN(parseInt(priceInputs[0].value)) &&
            priceInputs[0].value !== '') ||
          (Number.isNaN(parseInt(priceInputs[1].value)) &&
            priceInputs[1].value !== '')
        ) {
          showPricingError('Please make sure both fields are numbers');
          return;
        }

        if (priceInputs[0].value && priceInputs[1].value) {
          if (priceInputs[0].value <= priceInputs[1].value) {
            priceInputs[0].setAttribute('name', 'priceFrom');
            priceInputs[1].setAttribute('name', 'priceTo');
            persistedPriceValues = {
              from: priceInputs[0].value,
              to: priceInputs[1].value,
            };
            localStorage.setItem(
              'priceValues',
              JSON.stringify(persistedPriceValues)
            );
          } else {
            showPricingError(
              'Ending price must be greater than starting price'
            );
            return;
          }
        } else if (priceInputs[0].value && !priceInputs[1].value) {
          priceInputs[0].setAttribute('name', 'priceFrom');
          persistedPriceValues = { from: priceInputs[0].value };
          localStorage.setItem(
            'priceValues',
            JSON.stringify(persistedPriceValues)
          );
        } else if (!priceInputs[0].value && priceInputs[1].value) {
          priceInputs[1].setAttribute('name', 'priceTo');
          persistedPriceValues = { to: priceInputs[1].value };
          localStorage.setItem(
            'priceValues',
            JSON.stringify(persistedPriceValues)
          );
        }
      }
      submitFilter.submit();
    });
  }
  //Check
}

const headerNav = document.querySelector('header');
headerNav.addEventListener('click', (e) => {
  if (e.target.nodeName === 'A') {
    localStorage.removeItem('checkboxValues');
    localStorage.removeItem('priceValues');
  }
});

//Mobile filter open
const filterToggle = document.querySelector('.filter-toggle');
const sneakerFilter = document.querySelector('.sneaker-filter');
filterToggle.addEventListener('click', (e) => {
  sneakerFilter.classList.add('sneaker-filter-mobile-open');
});

//Mobile filter close
const filterExit = document.querySelector('.filter-exit');
filterExit.addEventListener('click', (e) => {
  sneakerFilter.classList.remove('sneaker-filter-mobile-open');
});
