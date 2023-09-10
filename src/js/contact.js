const contactForm = document.querySelector('.contact__form');
const btnSubmit = document.querySelectorAll('.btn--submit');
const inputs = document.querySelectorAll('.contact__input');
const fields = document.querySelectorAll('.contact__field');

export const contact = function () {
  contactForm.addEventListener('click', function (e) {
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
    const label = field.querySelector('.contact__label');
    input.focus();
    field.classList.add('contact__field--active');
    label.classList.add('contact__label--active');
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
      contactForm.reset();
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
    console.log(name);
    Email.send({
      SecureToken: '572dece7-992c-4b7e-82b4-8ccbb94cef6f Please take',
      To: 'sohaibbenyamna@gmail.com',
      From: 'sohaibbenyamna@gmail.com',
      Subject: `New client ${email.value}`,
      Body: generateUserData(),
    }).then(message => {
      if (message === 'OK') {
        swal({
          title: `Hi ${name} 👋`,
          text: 'We recieved your message',
          icon: 'success',
        });
      }
    });
  };
};
