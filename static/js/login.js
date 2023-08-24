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
        if(!document.querySelector('#username').value) {
            return notifyUser("Please enter your email", 'error');
        }

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
            .then(response => response.json())
            .then(result => {
                if(result.error) {
                    return notifyUser(result.error, 'error');
                }

                notifyUser('Email verification sent to: ' + document.querySelector('#username').value, 'success' );
                document.querySelector('#username').value = "";
            })
            .catch(error => notifyUser(error, 'error'));

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
                if (data.authorized === true) {
                    return window.location.assign("/");
                }
                notifyUser(data.error, 'error')
            })
            .catch(error => {
                console.log(error);
               notifyUser(error, 'error');
            });

        document.querySelector('#username').value = "";
        document.querySelector('#password').value = "";
        grecaptcha.reset();
    }
});

adminForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("admin-username"),
            password: form.get("admin-password")
        })
    };

    await fetch("/admins/login", options)
        .then(async response => {
            try {
                if (response.status === 403) {
                    return notifyUser((await response.json()).error, 'error');
                }
                window.location.assign("/admin-panel")
            } catch (error) {
                console.log(error);
            }

        })
        .catch(error => notifyUser(error, 'error'));
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

    grecaptcha.reset();
});

document.querySelector("#google-icon").addEventListener("click", () => {
    window.location.assign("/auth/google");
});

document.querySelector("#facebook-icon").addEventListener("click", () => {
    window.location.assign("/auth/facebook/callback");
});