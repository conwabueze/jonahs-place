const editForm = document.querySelector('.edit-form');
const name = document.querySelector('#name');
const nameValue = name.value;
const email = document.querySelector('#email');
const emailValue = email.value;
const errorHeader = document.querySelector('.my-account-error-header');

const invalidEmail = () => {
  email.classList.add('input-error');
  errorHeader.classList.add('show-error-header');
};

const updateUserInfo = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });

    if (res.data.status === 'success') {
      location.assign('/me');
    }
  } catch (err) {
    invalidEmail();
  }
};

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!name.value) name.value = nameValue;
  if (!email.value) email.value = emailValue;
  updateUserInfo(name.value, email.value);
});
