const passwordInput = document.querySelector('#password');
const passwordInput2 = document.querySelector('#password2');

const toggleIcon = document.querySelector('.password-container #toggleIcon');
const toggleIcon2 = document.querySelector('.password-container-2 #toggleIcon');
const passwordRequirements = document.querySelector('#password-requirements');
const requirementIcons = document.querySelectorAll('.requirements i');

const matchMessage = document.querySelector('#match-message');



toggleIcon.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type');
  passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
  toggleIcon.classList.toggle('fa-eye');
  toggleIcon.classList.toggle('fa-eye-slash');
});

toggleIcon2.addEventListener('click', () => {
    const type = passwordInput2.getAttribute('type');
    passwordInput2.setAttribute('type', type === 'password' ? 'text' : 'password');
    toggleIcon2.classList.toggle('fa-eye');
    toggleIcon2.classList.toggle('fa-eye-slash');
  });

passwordInput.addEventListener('input', () => {
    const passwordValue = passwordInput.value;
    // checking the user has entered an uppercase character
    requirementIcons[0].classList.toggle('fa-times', !/[A-Z]/.test(passwordValue));
    requirementIcons[0].classList.toggle('fa-check', /[A-Z]/.test(passwordValue));
  
    // checking if the user has entered a number
    requirementIcons[1].classList.toggle('fa-times', !/\d/.test(passwordValue));
    requirementIcons[1].classList.toggle('fa-check', /\d/.test(passwordValue));

    // checking if the user has entered a special character
    requirementIcons[2].classList.toggle('fa-times', !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passwordValue));
    requirementIcons[2].classList.toggle('fa-check', /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passwordValue));
  
    // checking if length is 8 or more
    requirementIcons[3].classList.toggle('fa-times', passwordValue.length < 8);
    requirementIcons[3].classList.toggle('fa-check', passwordValue.length >= 8);
  
  });

  
  // Password Validation
  const passwordMatcher = () => {
    passwordInput2.addEventListener('keyup', () => {
        const passwordValue = passwordInput.value; // gets the first value
        const passwordValue2 = passwordInput2.value; // listening for the second
        if (passwordValue === passwordValue2) {
            matchMessage.textContent = "Passwords match!";
            matchMessage.style.color = "green";
          } else {
            matchMessage.textContent = "Passwords do not match.";
            matchMessage.style.color = "red";
          }
    })
  }
  passwordMatcher()


