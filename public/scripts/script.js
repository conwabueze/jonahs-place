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

const sneakerFilter = document.querySelector('.sneaker-filter');

sneakerFilter.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'sneaker-filter-option') {
    const filterOption = document.querySelector(`#${e.target.classList[0]}`);
  }
});
