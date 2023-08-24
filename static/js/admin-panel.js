const firstButtons = document.querySelectorAll('.first-button');
const secondButtons = document.querySelectorAll('.second-button');
const sideBarNewsList = document.querySelector('#side-bar-news-list');
const sideBarEventsList = document.querySelector('#side-bar-events-list');
const sideBarSuggestionsList = document.querySelector('#side-bar-suggestions-list');
const sideBar = document.querySelector('#side-bar');

const addContentButton = document.querySelector('#add-content-button');
const topBarAddWrapper = document.querySelector('#top-bar-add-wrapper');

const homePanel = document.querySelector('#admin-panel-home-container');

const addNewsButton = document.querySelector('#add-news-button');
const addEventButton = document.querySelector('#add-event-button');
const addSuggestionButton = document.querySelector('#add-suggestion-button');

const addNewsForm = document.querySelector('#add-news-form');
const updateNewsForm = document.querySelector('#update-news-form');
const addEventForm = document.querySelector('#add-event-form');
const updateEventForm = document.querySelector('#update-event-form');
const addSuggestionForm = document.querySelector('#add-suggestion-form');
const updateSuggestionForm = document.querySelector('#update-suggestion-form');
const deleteFormDialog = document.querySelector('#delete-form-dialog');

const adminPanels = document.querySelectorAll('.admin-panel-container');
const overlayForms = document.querySelectorAll('.overlay-form');
const formCloseButtons = document.querySelectorAll('.form-close-button');
const overlay = document.querySelector('#overlay');

const deleteFormButton = document.querySelector('#delete-form-button');
const modifyButtonsTemplate = document.querySelector('#modify-buttons-template .card-modify-buttons-wrapper');
const pendingAlertButton = document.querySelector('#pending-alert-button');

let selectedId = -1;

const alertPending = async () => {
    let options = {
        headers: {
          "Authorization": "application/json"
        }
    }

    await fetch('http://localhost:3000/pending', options)
    .then((response) => response.json())
    .then((data) => {
        if (data.length > 0) {
            pendingAlertButton.classList.remove('hide');
        }
        else {
            pendingAlertButton.classList.add('hide');
        }
    });
}


const deselectTabs = () => {
    let tabSelected = sideBar.querySelectorAll('.tab-selected');
    for (let i = 0; i < tabSelected.length; i++) {
        tabSelected[i].classList.remove('tab-selected');
        console.log(tabSelected[i]);
        if (tabSelected[i].classList.contains('first-button-selected')) {
            tabSelected[i].classList.remove('first-button-selected');
        }
        else if (tabSelected[i].classList.contains('second-button-selected')) {
            tabSelected[i].classList.remove('second-button-selected')
        }
    }
}

const hideScreens = () => {
    for (let i = 0; i < overlayForms.length; i++) {
        overlayForms[i].classList.add('hide');
    }
    overlay.classList.add('hide');
}

const hidePanels = () => {
    for (let i = 0; i < adminPanels.length; i++) {
        adminPanels[i].classList.add('hide');
    }
}

const generateTables = (data) => {
    if (data.length == 0) return;
    const headerLength = Object.keys(data).length;
    let modifyButtons = modifyButtonsTemplate.cloneNode(true);

    const table = document.createElement('table');
    table.classList.add('data-table');

    const trHeader = document.createElement('tr');
    

    for (let i = 0; i < headerLength; i++) {
        let header = document.createElement('th');
        header.textContent = String(Object.keys(data)[i]);
        trHeader.appendChild(header);
    }

    table.appendChild(trHeader);

    for (let i = 0; i < data.length; i++) {
        let tableRow = document.createElement('tr');
        for (let j = 0; j < headerLength; j++) {
            let td1 = document.createElement('td');
            td1.textContent = String(data[Object.keys(data)[j]]);
            tableRow.appendChild(td1);
        }
    }

    for (let i = 0; i < adminPanels.length; i++) {
        if (!adminPanels[i].classList.contains('hide')) {
            adminPanels[i].querySelector('.data-table-wrapper').appendChild(table);
        }
    }
}

addNewsForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

updateNewsForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

updateEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

addSuggestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
updateSuggestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

deleteFormButton.addEventListener('click', (e) => {
    e.preventDefault();

});

const init = () => {
    for (let i = 0; i < firstButtons.length; i++) {
        firstButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
    
    
            if (firstButtons[i].id == 'side-bar-news') {
                if (sideBarNewsList.classList.contains('side-bar-list-expanded')) {
                    sideBarNewsList.classList.remove('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.remove('tab-selected-path');
                }
                else {
                    sideBarNewsList.classList.add('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.add('tab-selected-path');
                }
            }
            else if (firstButtons[i].id == 'side-bar-events') {
                if (sideBarEventsList.classList.contains('side-bar-list-expanded')) {
                    sideBarEventsList.classList.remove('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.remove('tab-selected-path');
                }
                else {
                    sideBarEventsList.classList.add('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.add('tab-selected-path');
                }
            }
            else if (firstButtons[i].id == 'side-bar-suggestions') {
                if (sideBarSuggestionsList.classList.contains('side-bar-list-expanded')) {
                    sideBarSuggestionsList.classList.remove('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.remove('tab-selected-path');
                }
                else {
                    sideBarSuggestionsList.classList.add('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.add('tab-selected-path');
                }
            }
            else {
                deselectTabs();
                firstButtons[i].classList.add('tab-selected');
                firstButtons[i].classList.add('first-button-selected');
            }
    
            
        });
    }
    
    for (let i = 0; i < secondButtons.length; i++) {
        secondButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
            
            deselectTabs();
            
            secondButtons[i].classList.add('tab-selected');
            secondButtons[i].classList.add('second-button-selected');
        });
    }

    for (let i = 0; i < formCloseButtons.length; i++) {
        formCloseButtons[i].addEventListener('click', (e) => {
            e.preventDefault();

            formCloseButtons[i].closest('.overlay-form').classList.add('hide');
            overlay.classList.add('hide');
        });
    }

    addNewsButton.addEventListener('click', (e) => {
        e.preventDefault();

        addNewsForm.classList.remove('hide');
        overlay.classList.remove('hide');
    });

    addEventButton.addEventListener('click', (e) => {
        e.preventDefault();

        addEventForm.classList.remove('hide');
        overlay.classList.remove('hide');
    });

    addSuggestionButton.addEventListener('click', (e) => {
        e.preventDefault();

        addSuggestionForm.classList.remove('hide');
        overlay.classList.remove('hide');
    });

    addContentButton.addEventListener('click', (e) => {
        if (topBarAddWrapper.classList.contains('add-wrapper-expanded')) {
            topBarAddWrapper.classList.remove('add-wrapper-expanded');
        }
        else {
            topBarAddWrapper.classList.add('add-wrapper-expanded');
        }
    });
}

init();