const navWrapper = document.querySelector('#nav-wrapper');
const templates = document.querySelector('template');

let userType = '';

const notifyUser = async (message, status) => {
    const notificationBox = document.getElementById('notification_box');


    const alertData = {
        success: {
            class: 'alert-success',
            image: '../res/tick.png',
        },
        warning: {
            class: 'alert-warning',
            image: '../res/warning.png',
        },
        error: {
            class: 'alert-error',
            image: '../res/error.png',
        },
        info: {
            class: 'alert-primary',
            image: '../res/info.png',
        },
    };

    const alert = alertData[status] || alertData.info;

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alert.class}`;

    const iconImage1 = document.createElement('img');
    iconImage1.src = alert.image;
    iconImage1.style.width = '40px';
    iconImage1.style.height = '40px';
    alertDiv.appendChild(iconImage1);

    const messageParagraph = document.createElement('p');
    messageParagraph.innerHTML = message;
    alertDiv.appendChild(messageParagraph);

    const iconImage2 = document.createElement('img');

    iconImage2.src = "../res/x.png";
    iconImage2.style.width = '40px';
    iconImage2.style.height = '40px';
    iconImage2.style.marginLeft = 'auto';
    iconImage2.style.cursor = 'pointer';

    iconImage2.addEventListener('click', () => {
        notificationBox.removeChild(alertDiv);
    });
    alertDiv.appendChild(iconImage2);

    notificationBox.appendChild(alertDiv);

    setTimeout(() => {
        notificationBox.removeChild(alertDiv);
    }, 2200);
}

const checkUserPermission = async () => {
    await fetch('/account_type', { method: "POST" })
    .then((response) =>  response.json())
    .then((data) => {
        try {
            
            if (data['account'] === "guest") {
                // console.log("Guest");
                userType = 'guest';
                navWrapper.appendChild(templates.content.querySelector('.nav-right-guest').cloneNode(true));
            }
            else if (Object.keys(data['account']).length === 5) {
                // user
                // console.log("User");
                userType = 'user';
                navWrapper.appendChild(templates.content.querySelector('.nav-right-user').cloneNode(true));
                const navAccountIcon = document.querySelector('#nav-account-icon');
                const navAccountDropdownList = document.querySelector('#nav-account-dropdown-list');
                
                console.log();
                navWrapper.querySelector('#nav-account-logout').addEventListener('click',  (e) => {
                    e.preventDefault();

                    // console.log("Therer");
                });

                navAccountIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (navAccountDropdownList.classList.contains('hide')) {
                        navAccountDropdownList.classList.remove('hide');
                    } else {
                        navAccountDropdownList.classList.add('hide');
                    }
                });

                navAccountDropdownList.addEventListener('mouseleave', (e) => {
                    e.preventDefault();
                    navAccountDropdownList.classList.add('hide');
                });

            }
            else {
                // admin
                // console.log("Admin");
                userType = 'admin';
                navWrapper.appendChild(templates.content.querySelector('.nav-right-admin').cloneNode(true));
                const navAccountIcon = document.querySelector('#nav-account-icon');
                const navAccountDropdownList = document.querySelector('#nav-account-dropdown-list');

                navWrapper.querySelector('#nav-account-logout').addEventListener('click', (e) => {
                    e.preventDefault();
                    adminLogout();
                });

                navAccountDropdownList.querySelector('#nav-account-admin-panel').addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.assign('/admin-panel');
                });
                

                navAccountIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (navAccountDropdownList.classList.contains('hide')) {
                        navAccountDropdownList.classList.remove('hide');
                    } else {
                        navAccountDropdownList.classList.add('hide');
                    }
                });

                navAccountDropdownList.addEventListener('mouseleave', (e) => {
                    e.preventDefault();
                    navAccountDropdownList.classList.add('hide');
                });
            }
        } catch (error) {
            
        }
        
    })
    .catch((error) => console.log(error));
}

const adminLogout = async () => {
    await fetch('/admins/logout', { method: "POST" })
        .then((response) => response.json())
        .then(() => {
            window.location.assign('/');
        })
        .catch(() => window.location.assign('/'));
};


const userLogout = async () => {
    await fetch('/users/logout', { method: "POST" })
        .then((response) => response.json())
        .then(() => {
            window.location.assign('/');
        })
        .catch(() => window.location.assign('/'));
};



// notifyUser('This is a success message', 'success');
checkUserPermission();