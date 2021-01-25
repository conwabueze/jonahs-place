const shopNav = document.querySelector('.shop-nav');
const sca = document.querySelector('.sca-container');
const hamburger = document.querySelector('.hamburger');
const activeAccount = document.querySelector('.active-account');
const nestedAccountNav = document.querySelector('.nested-account-nav');
const vLine = document.querySelector('.v-line');
const accountFilterExit = document.querySelector('.account-filter-exit');

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

const dtSneakerDropdown = () => {
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
};

const accountDropdownDT = () => {
  if (activeAccount)
    activeAccount.addEventListener('click', (e) => {
      if (nestedAccountNav.classList.length === 1)
        nestedAccountNav.classList.add('open-account-nav');
      else nestedAccountNav.classList.remove('open-account-nav');
    });
};

const accountSlideMB = () => {
  if (activeAccount) {
    activeAccount.addEventListener('click', (e) => {
      nestedAccountNav.classList.add('nested-account-nav-mobile-open');
    });
    accountFilterExit.addEventListener('click', (e) => {
      nestedAccountNav.classList.remove('nested-account-nav-mobile-open');
    });
  }
};

if (window.innerWidth > 970) {
  dtSneakerDropdown();
  accountDropdownDT();
} else {
  accountSlideMB();
  vLine.classList.add('hide-v-line');
}

window.addEventListener('resize', (e) => {
  if (window.innerWidth > 970) {
    dtSneakerDropdown();
    accountDropdownDT();
    vLine.classList.remove('hide-v-line');
  } else {
    accountSlideMB();
    vLine.classList.add('hide-v-line');
  }
});

//dropdown for sneaker types in mobile
// shopNav.addEventListener('click', (e) => {
//   if (e.target.className.includes('sneaker-link')) {
//     const dropdown = document.querySelector(`#${e.target.classList[2]}`);
//     if (dropdown.className.includes('close-dropdown-nav')) {
//       dropdown.className = dropdown.className.replace(
//         'close-dropdown-nav',
//         'open-dropdown-nav'
//       );
//     } else if (dropdown.className.includes('open-dropdown-nav')) {
//       dropdown.className = dropdown.className.replace(
//         'open-dropdown-nav',
//         'close-dropdown-nav'
//       );
//     }
//   }
// });
