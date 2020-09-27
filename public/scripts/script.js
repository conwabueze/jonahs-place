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

  //Sneaker filter persist checkedboxes and
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

  sneakerFilter.addEventListener('change', (e) => {
    if (e.target.parentElement.className.includes('filter-options')) {
      checkboxes.forEach((checkbox) => {
        checkboxValues[checkbox.id] = checkbox.checked;
      });
      localStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));

      //submit all forms/filter
      const submitFilter = document.querySelector('.filter-submission');
      submitFilter.submit();
    }
  });
} else {
  localStorage.removeItem('checkboxValues');
}
