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
            password: form.get("password")
        })
    }

    const response = await fetch("/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("board.html");
    } else {
        alert(data.error);
    }
});

loginAccountButton.addEventListener('click', (e) => {
    e.preventDefault();
    const tie = document.querySelector('.tie');
    if (tie.classList.contains('admin')) {
        tie.classList.remove('admin');
        adminForm.classList.add('hide');
        loginForm.classList.remove('hide');
    }
    else {
        tie.classList.add('admin');
        loginForm.classList.add('hide');
        adminForm.classList.remove('hide');
    }
});