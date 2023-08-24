const navAccountIcon = document.querySelector('#nav-account-icon');
const navAccountDropdownList = document.querySelector('#nav-account-dropdown-list');

const toggleDropdown = (e) => {
    e.preventDefault();
    if (navAccountDropdownList.classList.contains('hide')) {
        navAccountDropdownList.classList.remove('hide');
    } else {
        navAccountDropdownList.classList.add('hide');
    }

}

const hideDropdown = (e) => {
    e.preventDefault();
    navAccountDropdownList.classList.add('hide');
}

navAccountIcon.addEventListener('click', toggleDropdown);

navAccountDropdownList.addEventListener('mouseleave', hideDropdown);

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
createNotificationWithImage('This is a success message', 'error');