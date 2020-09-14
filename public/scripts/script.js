const shopNav = document.querySelector('.shop-nav');
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
// const sneakerNav = document.querySelector('.sneaker-nav');
// const userNav = document.querySelector('.user-nav');

// document.querySelector('.hamburger').addEventListener('click', (e) => {
//   let sneakerNavClassNames = sneakerNav.className;
//   let userNavClassNames = userNav.className;
//   if (sneakerNavClassNames.includes('close-nav')) {
//     sneakerNavClassNames = sneakerNavClassNames.replace(
//       'close-nav',
//       'open-nav'
//     );
//     userNavClassNames = userNavClassNames.replace('close-nav', 'open-nav');
//   } else {
//     sneakerNavClassNames = sneakerNavClassNames.replace(
//       'open-nav',
//       'close-nav'
//     );
//     userNavClassNames = userNavClassNames.replace('open-nav', 'close-nav');
//   }
//   sneakerNav.className = sneakerNavClassNames;
//   userNav.className = userNavClassNames;
// });

// // Open/Close sub nav functionality
// if (window.innerWidth > 880) {
//   //hover desktop
//   sneakerNav.addEventListener('mouseover', (e) => {
//     if (e.target.classList[0] === 'nav-item') {
//       const subMenu = document.querySelector(`#${e.target.classList[1]}`);
//       if (subMenu.classList[1] === 'close-dropdown-nav') {
//         subMenu.className = subMenu.className.replace(
//           'close-dropdown-nav',
//           'open-dropdown-nav'
//         );
//       }
//     }
//   });

//   //hover off desktop
//   sneakerNav.addEventListener('mouseout', (e) => {
//     if (
//       e.target.classList[0] === 'nav-item' ||
//       e.target.classList[0] === 'nav-nested-dropdown'
//     ) {
//       console.log(e.target);
//       const targetClass = e.target.classList[0];
//       let subMenu;
//       if (targetClass === 'nav-nested-dropdown') {
//         console.log(e.target);
//         // subMenu.className = subMenu.className.replace(
//         //   'open-dropdown-nav',
//         //   'close-dropdown-nav'
//         // );
//       }
//     }
//   });
// } else {
//   sneakerNav.addEventListener('click', (e) => {
//     if (e.target.classList[0] === 'nav-item') {
//       const subMenu = document.querySelector(`#${e.target.classList[1]}`);
//       if (subMenu.classList[1] === 'close-nav') {
//         subMenu.className = subMenu.className.replace('close-nav', 'open-nav');
//       } else {
//         subMenu.className = subMenu.className.replace('open-nav', 'close-nav');
//       }
//     }
//     //console.log(e.currentTarget);
//   });
// }
