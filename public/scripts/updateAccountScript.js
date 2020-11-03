const editForm = document.querySelector('.edit-form');
const name = document.querySelector('#name');
const nameValue = name.value;
const email = document.querySelector('#email');
const emailValue = email.value;
const editErrorHeader = document.querySelector('.edit-error-header');
const editSuccessHeader = document.querySelector('.edit-success-header');
const passwordChangeForm = document.querySelector('.password-change-form');
const passwordInputs = document.querySelectorAll('.password-change-input');
const passwordSuccessHeader = document.querySelector(
  '.password-success-header'
);
const passwordErrorHeader = document.querySelector('.password-error-header');

const updateUserInfo = async (userName, userEmail) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMe',
      data: {
        name: userName,
        email: userEmail,
      },
    });

    if (res.data.status === 'success') {
      editSuccessHeader.classList.add('show-success-header');
      name.classList.add('input-success');
      email.classList.add('input-success');

      setTimeout(() => {
        location.assign('/me');
      }, 2000);
    }
  } catch (err) {
    console.log(err);
    email.classList.add('input-error');
    editErrorHeader.classList.add('show-error-header');
    setTimeout(() => {
      email.classList.remove('input-error');
      editErrorHeader.classList.remove('show-error-header');
    }, 3000);
  }
};

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!name.value) name.value = nameValue;
  if (!email.value) email.value = emailValue;
  updateUserInfo(name.value, email.value);
});

const changePassword = async (
  currentPassword,
  newPassword,
  newPasswordConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMyPassword',
      data: {
        currentPassword,
        newPassword,
        newPasswordConfirm,
      },
    });

    if (res.data.status === 'success') {
      passwordSuccessHeader.classList.add('show-success-header');
      passwordInputs.forEach((input) => {
        input.classList.add('input-success');
      });

      setTimeout(() => {
        location.assign('/me');
      }, 2000);
    }
  } catch (err) {
    passwordErrorHeader.innerHTML = err.response.data.message;
    passwordErrorHeader.classList.add('show-error-header');
    passwordInputs.forEach((input) => {
      input.classList.add('input-error');
    });

    setTimeout(() => {
      passwordErrorHeader.classList.remove('show-error-header');
      passwordInputs.forEach((input) => {
        input.classList.remove('input-error');
      });
    }, 3000);
  }
};

passwordChangeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  changePassword(
    passwordInputs[0].value,
    passwordInputs[1].value,
    passwordInputs[2].value
  );
});
