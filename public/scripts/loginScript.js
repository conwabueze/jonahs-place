const loginForm = document.querySelector('.login-form');
const loginInputs = document.querySelectorAll('.login-input');
const inputErrorHeader = document.querySelector('.input-error-header');
const accountLogOut = document.querySelector('.account-logout');

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
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      location.reload(true); // setting true forces reload from the server and not browser cache
    }
  } catch (err) {
    console.log(err);
  }
};
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
if (accountLogOut)
  accountLogOut.addEventListener('click', (e) => {
    logout();
    console.log('HOP');
  });
