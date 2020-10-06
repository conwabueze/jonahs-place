const shopNav = document.querySelector('.shop-nav');
const sca = document.querySelector('.sca-container');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', (e) => {
  let shopNavClassNames = shopNav.className;
  let scaClassNames = sca.className;
  if (shopNavClassNames.includes('close-nav')) {
    shopNavClassNames = shopNavClassNames.replace('close-nav', 'open-nav');
    scaClassNames = scaClassNames.replace('close-nav', 'open-nav');
  } else {
    shopNavClassNames = shopNavClassNames.replace('open-nav', 'close-nav');
    scaClassNames = scaClassNames.replace('open-nav', 'close-nav');
  }

  shopNav.className = shopNavClassNames;
  sca.className = scaClassNames;
});

if (window.innerWidth > 970) {
  shopNav.addEventListener('mouseover', (e) => {
    if (e.target.className.includes('sneaker-link')) {
      const dropdown = document.querySelector(`#${e.target.classList[2]}`);
      dropdown.className = dropdown.className.replace(
        'close-dropdown-nav',
        'open-dropdown-nav'
      );
    }

    if (e.target.className.includes('nested-shop-nav')) {
      e.target.className = e.target.className.replace(
        'close-dropdown-nav',
        'open-dropdown-nav'
      );
    }

    if (e.target.className.includes('nested-shop-nav-item')) {
      e.target.parentElement.className = e.target.parentElement.className.replace(
        'close-dropdown-nav',
        'open-dropdown-nav'
      );
    }
  });

  shopNav.addEventListener('mouseout', (e) => {
    if (e.target.className.includes('sneaker-link')) {
      const dropdown = document.querySelector(`#${e.target.classList[2]}`);
      dropdown.className = dropdown.className.replace(
        'open-dropdown-nav',
        'close-dropdown-nav'
      );
    }

    if (e.target.className.includes('nested-shop-nav')) {
      e.target.className = e.target.className.replace(
        'open-dropdown-nav',
        'close-dropdown-nav'
      );
    }

    if (e.target.className.includes('nested-shop-nav-item')) {
      e.target.parentElement.className = e.target.parentElement.className.replace(
        'open-dropdown-nav',
        'close-dropdown-nav'
      );
    }
  });
} else {
  shopNav.addEventListener('click', (e) => {
    if (e.target.className.includes('sneaker-link')) {
      const dropdown = document.querySelector(`#${e.target.classList[2]}`);
      if (dropdown.className.includes('close-dropdown-nav')) {
        dropdown.className = dropdown.className.replace(
          'close-dropdown-nav',
          'open-dropdown-nav'
        );
      } else if (dropdown.className.includes('open-dropdown-nav')) {
        dropdown.className = dropdown.className.replace(
          'open-dropdown-nav',
          'close-dropdown-nav'
        );
      }
    }
  });
}

if (document.querySelector('body').className === 'sneakers-overview-body') {
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

  //Sneaker filter persist data

  //checkbox persist
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

  const submitFilter = document.querySelector('.filter-submission');
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

  //pricing persist/keep price filter open if being used
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

  //Pricing filter submit logic

  //Prevent users form submitting pricing form by hitting enter
  priceInputs.forEach((label) => {
    label.addEventListener('keypress', (e) => {
      //13 is keycode for Enter button
      if (e.keyCode == 13) e.preventDefault();
    });
  });

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

  //check if both input fields are filled before adding name parameter to inputs upon submission
  const priceSubmitBtn = document.querySelector('.price-submit');
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
      // showPricingError('At least one or both fields should be filled out');
      // return;
      localStorage.setItem('priceValues', JSON.stringify(persistedPriceValues));
      submitFilter.submit();
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
      localStorage.setItem('priceValues', JSON.stringify(persistedPriceValues));
      submitFilter.submit();
    } else if (!priceInputs[0].value && priceInputs[1].value) {
      priceInputs[1].setAttribute('name', 'priceTo');
      persistedPriceValues = { to: priceInputs[1].value };
      localStorage.setItem('priceValues', JSON.stringify(persistedPriceValues));
      submitFilter.submit();
    }
  });

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

  //if currentpage is equal to 1 hide previous - button

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

  //Check
} else {
  localStorage.removeItem('checkboxValues');
  localStorage.removeItem('priceValues');
}
