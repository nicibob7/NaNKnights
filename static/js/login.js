const loginForm = document.querySelector('#login-form');
const adminForm = document.querySelector('#admin-form');
const resetPassword = document.querySelector('#forgot-password');

const loginAccountButton = document.querySelector('#login-account-button');
let resetFlag = false;

resetPassword.addEventListener('click', (e) => {
    resetFlag = !resetFlag;

    if (resetFlag) {
        document.querySelector('#password').classList.add('hide');
        document.querySelector('#username').placeholder = "Email";
        document.querySelector('#username').name = "email";
        document.querySelector('#login_reset-btn').value = "Reset Password";
        e.target.textContent = "Go Back";
        grecaptcha.reset();
    } else {
        document.querySelector('#password').classList.remove('hide');
        document.querySelector('#username').placeholder = "Username";
        document.querySelector('#username').name = "username";
        document.querySelector('#login_reset-btn').value = "Login";
        e.target.textContent = "Forgot Password?";
        grecaptcha.reset();
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    if (resetFlag) {
        let raw = JSON.stringify({
            "email": document.querySelector('#username').value,
            "g-recaptcha-response": grecaptcha.getResponse(),
        });

        let requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        };

        fetch("/users/reset", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        grecaptcha.reset();
        // display notification or something
    } else {
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.get("username"),
                password: form.get("password"),
                "g-recaptcha-response": grecaptcha.getResponse()
            })
        };

        await fetch("/users/login", options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.assign("/")
            })
            .catch(error => {
                console.log(error);
            });

        grecaptcha.reset();
    }
});

loginAccountButton.addEventListener('click', (e) => {
    e.preventDefault();
    const tie = document.querySelector('.tie');
    if (tie.classList.contains('admin')) {
        tie.classList.remove('admin');
        adminForm.classList.add('hide');
        loginForm.classList.remove('hide');
    } else {
        tie.classList.add('admin');
        loginForm.classList.add('hide');
        adminForm.classList.remove('hide');
    }
});

document.querySelector("#google-icon").addEventListener("click", () => {
    window.location.assign("/auth/google");
});

document.querySelector("#facebook-icon").addEventListener("click", () => {
    window.location.assign("/auth/facebook/callback");
});