const navAccountIcon = document.querySelector('#nav-account-icon');
const navAccountDropdownList = document.querySelector('#nav-account-dropdown-list');

const toggleDropdown = (e) => {
    e.preventDefault();
    if (navAccountDropdownList.classList.contains('hide')) {
        navAccountDropdownList.classList.remove('hide');
    }
    else {
        navAccountDropdownList.classList.add('hide');
    }
    
}

const hideDropdown = (e) => {
    e.preventDefault();
    navAccountDropdownList.classList.add('hide');
}

navAccountIcon.addEventListener('click', toggleDropdown);

navAccountDropdownList.addEventListener('mouseleave', hideDropdown);