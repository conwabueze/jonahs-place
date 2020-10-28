// import axios from 'axios';

const loginForm = document.querySelector('.login-form');
const loginInputs = document.querySelectorAll('.login-input');
const inputErrorHeader = document.querySelector('.input-error-header');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email: email,
        password: password,
      },
    });

    if (res.data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    inputErrorHeader.classList.remove('hide-header');
    loginInputs.forEach((input) => {
      input.classList.add('input-error');
    });

    // setTimeout(() => {
    //   inputErrorHeader.classList.add('hide-header');
    //   loginInputs.forEach((input) => {
    //     input.classList.remove('input-error');
    //   });
    // }, 3000);
  }
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  login(email, password);
});
