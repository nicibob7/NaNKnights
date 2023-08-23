const loginForm = document.querySelector('#login-form');
const adminForm = document.querySelector('#admin-form');


const loginAccountButton = document.querySelector('#login-account-button');


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

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