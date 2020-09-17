const shopNav = document.querySelector('.shop-nav');
const sca = document.querySelector('.sca-container');
const hamburger = document.querySelector('.hamburger');

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
