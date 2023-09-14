import { showSpinner } from './project';
console.log(showSpinner);
const contactForm = document.querySelector('.contact__form');
const btnSubmit = document.querySelectorAll('.btn--submit');
const inputs = document.querySelectorAll('.contact__input');
const fields = document.querySelectorAll('.contact__field');
const overlay = document.querySelector('.overlay');

export const contact = function () {
  const activateFocusedInput = function (e) {
    // CLEAR
    const labels = document.querySelectorAll('.contact__label');
    labels.forEach(label => {
      const field = label.closest('.contact__field');
      field.classList.remove('contact__field--active');
      if (field.querySelector('.contact__input').value === '') {
        label.classList.remove('contact__label--active');
      }
    });
    const field = e.target.closest('.contact__field');
    if (!field) return;
    const input = field.querySelector('.contact__input');
    input.focus();
    const label = field.querySelector('.contact__label');
    if (input === document.activeElement) {
      field.classList.add('contact__field--active');
      label.classList.add('contact__label--active');
    }
  };

  window.addEventListener('keyup', function (e) {
    if (e.key === 'Tab') {
      activateFocusedInput(e);
    }
  });

  contactForm.addEventListener('click', function (e) {
    activateFocusedInput(e);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.contact__field')) {
      fields.forEach(field => {
        const input = field.querySelector('.contact__input');
        const label = field.querySelector('.contact__label');
        input.blur();
        field.classList.remove('contact__field--active');
        if (field.querySelector('.contact__input').value === '') {
          label.classList.remove('contact__label--active');
        }
      });
    }
  });

  // FORM VALIDATION

  const showErr = function (input) {
    const field = input.closest('.contact__field');
    const label = field.querySelector('.contact__label');
    field.classList.add('contact__field--err');
    label.classList.add('contact__label--err');
    if (!field.querySelector('.contact__err')) {
      field.insertAdjacentHTML(
        'beforeend',
        `<p class="contact__err contact__err--hidden">please fill your ${input.getAttribute(
          'name'
        )}</p>`
      );
    }
    setTimeout(() => {
      field
        .querySelector('.contact__err')
        .classList.remove('contact__err--hidden');
    }, 0);
  };

  const clearInput = function (input) {
    const field = input.closest('.contact__field');
    const label = field.querySelector('.contact__label');
    field.classList.remove('contact__field--err');
    label.classList.remove('contact__label--err');
    field.querySelector('.contact__err')?.classList.add('contact__err--hidden');
  };

  inputs.forEach(input => {
    input.addEventListener('change', function () {
      clearInput(this);
    });
  });

  const checkInputs = inputs => inputs.every(input => input.value !== '');

  const showoverlay = function () {
    overlay.classList.remove('hidden');
    overlay.insertAdjacentHTML('beforeend', showSpinner());
  };

  const hideoverlay = function () {
    overlay.classList.add('hidden');
    overlay.lastElementChild.remove();
  };

  btnSubmit.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // clear err
      inputs.forEach(input => {
        clearInput(input);
      });
      // show err
      if (!checkInputs([...inputs])) {
        inputs.forEach(input => {
          if (input.value === '') {
            showErr(input);
          }
        });
        return;
      }
      emailSend();
      showoverlay();
      return false;
    });
  });

  // SENDE EMAIL

  const fName = document.querySelector('.contact__input[name="fName"]');
  const lName = document.querySelector('.contact__input[name="lName"]');
  const email = document.querySelector('.contact__input[name="email"]');
  const message = document.querySelector('.contact__input[name="message"]');

  const generateUserData = function () {
    const body = `
    <b>First name: </b>${fName.value}
    <br>
    <b>Last name: </b>${lName.value}
    <br>
    <b>Email: </b>${email.value}
    <br>
    <b>Message: </b>${message.value}
    <br>
    `;
    return body;
  };

  const emailSend = function () {
    const name =
      fName.value.toLowerCase().slice(0, 1).toUpperCase() +
      fName.value.slice(1);
    Email.send({
      SecureToken: 'e192c4db-cdb8-4da1-97fa-1c5436364319',
      To: 'sohaibbenyamna@gmail.com',
      From: 'info@sodev.live',
      Subject: `New Client From ${email.value}`,
      Body: generateUserData(),
    }).then(message => {
      hideoverlay();
      contactForm.reset();
      if (message === 'OK') {
        swal({
          title: `Hi ${name} 👋`,
          text: 'We recieved your message, wait a respond',
          icon: 'success',
        });
      } else {
        swal({
          title: `Sorry 😔`,
          text: 'Problem with the server try again',
          icon: 'error',
        });
      }
    });
  };
};
