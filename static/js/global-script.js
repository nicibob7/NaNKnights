const navWrapper = document.querySelector('#nav-wrapper');
const templates = document.querySelector('template');

const createNotificationWithImage = async (message, status) => {
    const notificationBox = document.getElementById('notification_box');

    const alertData = {
        success: {
            class: 'alert-success',
            image: 'res/tick.png',
        },
        warning: {
            class: 'alert-warning',
            image: 'res/warning.png',
        },
        error: {
            class: 'alert-error',
            image: 'res/error.png',
        },
        info: {
            class: 'alert-primary',
            image: 'res/info.png',
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

    iconImage2.src = "res/x.png";
    iconImage2.style.width = '40px';
    iconImage2.style.height = '40px';
    iconImage2.style.marginLeft = 'auto';
    iconImage2.addEventListener('click', () => {
        notificationBox.removeChild(alertDiv);
    });
    alertDiv.appendChild(iconImage2);

    notificationBox.appendChild(alertDiv);
}

const checkUserPermission = async () => {

    await fetch('/admins/ping', { method: "POST" })
    .then((response) => {
        const res =  response.json()
        
        if (response.status === "200") {
            // admin
            console.log("Admin");
            navWrapper.appendChild(templates.content.querySelector('.nav-right-admin').cloneNode(true));
            const navAccountIcon = document.querySelector('#nav-account-icon');
            const navAccountDropdownList = document.querySelector('#nav-account-dropdown-list');
            
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
            // user
            console.log("User");
            navWrapper.appendChild(templates.content.querySelector('.nav-right-user').cloneNode(true));
            const navAccountIcon = document.querySelector('#nav-account-icon');
            const navAccountDropdownList = document.querySelector('#nav-account-dropdown-list');
            
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

    })
    .then((data) => {
        
        
    })
    .catch((error) => console.log(error));
}

// createNotificationWithImage('This is a success message', 'error');
checkUserPermission();
