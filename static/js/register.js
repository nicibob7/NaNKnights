const passwordInput = document.querySelector('#password');
const passwordInput2 = document.querySelector('#password2');

const passwordRequirements = document.querySelector('#password-requirements');
const requirementIcons = document.querySelectorAll('.requirements i');
let passwordsCheck = false;

const matchMessage = document.querySelector('#match-message');


passwordInput.addEventListener('input', () => {
    passwordsCheck = false;
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

    passwordsCheck = true;
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

passwordMatcher();
// Get the popup
const popup = document.querySelector("#myPopup");

// Get the <span> element that closes the popup
const span = document.querySelectorAll(".close")[0];

document.querySelector("#popup-close").addEventListener('click', () => {
    window.location.assign('/login');
});

document.querySelector(".registration-form").addEventListener('submit', e => {
    e.preventDefault();
    // get the values from the form


    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let password2 = document.querySelector("#password2").value;
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let phoneNumber = document.querySelector("#phoneNumber").value;
    let address = document.querySelector("#address").value;
    let username = document.querySelector("#username").value;
    //check if any are empty
    if (email === "" || password === "" || password2 === "" || firstName === "" || lastName === "" || phoneNumber === "") {
        return notifyUser("Please fill in all fields", "error");
    }

    if(password !== password2) {
        return notifyUser("Passwords do not match!", "error");
    }

    if(phoneNumber.length >= 16) {
        return notifyUser("Phone number length is invalid!", "error");
    }

    if(address >= 16){
        return notifyUser("Address length is invalid!", "error");
    }

    // perform a fetch request to the server
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": email,
        "password": password,
        "first_name": firstName,
        "last_name": lastName,
        "phone_number": phoneNumber,
        "postal_code": address,
        "username": username,
        "g-recaptcha-response": grecaptcha.getResponse(),
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log(requestOptions);

    fetch("/users/register", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status === "success") {
                popup.style.display = "block";
            } else {
                return notifyUser(result.error, "error");
            }
        })
        .catch(error => notifyUser(error, "error"));
})
// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    popup.style.display = "none";
}
// When the user clicks anywhere outside the modal, close it
window.onclick = event => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
}