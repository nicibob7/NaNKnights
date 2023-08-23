const filterButton = document.querySelector('#filter-button');
const filterButtonPath = document.querySelector('#filter-button > svg > path');
const filterDropdown = document.querySelector('#top-dropdown-box');
const addEventForm = document.querySelector('#add-event-form');
const addEventButton = document.querySelector('#add-event-button');
const addEventUpload = document.querySelector('#add-event-upload');
const addEventCloseButton = document.querySelector('#add-event-close-button');
const addEventCancelButton = document.querySelector('#add-event-cancel-button');
const addEventSubmitButton = document.querySelector('#add-event-submit-button');
const overlay = document.querySelector('#overlay');
const addEventElements = document.querySelectorAll('.add-event-form-input');
const filterForm = document.querySelector('#filter-form');
const updateEventForm = document.querySelector('#update-event-form');
const updateEventCloseButton = document.querySelector('#update-event-close-button');
const updateEventCancelButton = document.querySelector('#update-event-cancel-button');
const updateEventSubmitButton = document.querySelector('#update-event-submit-button');
const deleteEventCancelButton = document.querySelector('#delete-event-cancel-button');
const deleteEventButton = document.querySelector('#delete-event-button');
const deleteEventDialog = document.querySelector('#delete-event-dialog');
const cardsList = document.querySelectorAll('.card');

let selectedID = 0;

function overlayShow() {
    document.getElementById('overlay').style.opacity = (parseFloat(document.getElementById('overlay').style.opacity) + 0.1);
    if (document.getElementById('overlay').style.opacity < 1) {
        setTimeout(overlayShow, 20);
    }
    
}

function overlayFadeIn() {
    document.getElementById('overlay').style.opacity = 0;
    document.getElementById('overlay').style.display = 'flex';
    setTimeout(overlayShow, 20);
}


const hideOverlay = () => {
    overlay.classList.add('hide');
    addEventForm.classList.add('hide');
    updateEventForm.classList.add('hide');
    deleteEventDialog.classList.add('hide');
}


filterButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (filterDropdown.classList.contains('filter-stretch')) {
        filterDropdown.classList.remove('filter-stretch');
        filterButtonPath.classList.remove('filter-image-reverse-path');
    }
    else {
        filterDropdown.classList.add('filter-stretch');
        filterButtonPath.classList.add('filter-image-reverse-path');
    }
});

addEventUpload.addEventListener('change', (e) => {
    const target = e.target
  	if (target.files.length > 0) {

        for (let i = 0; i < target.files.length; i++) {
            const maxAllowedSize = 1 * 1024 * 1024;
            if (target.files[i].size > maxAllowedSize) {
                target.value = ''
            }
        }
      
    }
});

addEventCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    //overlayFadeOut();
    // overlay.classList.add('hide');
    hideOverlay();
});

addEventCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

addEventSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
});

updateEventCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    //overlayFadeOut();
    // overlay.classList.add('hide');
    hideOverlay();
});

updateEventCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

updateEventSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
});

deleteEventCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

deleteEventButton.addEventListener('click', (e) => {
    e.preventDefault();
});

addEventButton.addEventListener('click', (e) => {
    e.preventDefault();
    addEventForm.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
});

addEventForm.addEventListener('input', (e) => {
    e.preventDefault();
    let emptyInput = false;

        for (let j = 0; j < addEventElements.length; j++) {
            
            if (addEventElements[j].value == "" || !addEventElements[j].value) {
                emptyInput = true;
                break;
            }
        }
        
        if (!emptyInput) {
            addEventSubmitButton.disabled = false;
        }
        else {
            addEventSubmitButton.disabled = true;
        }
});

addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add event to database POST Request
    console.log('Fired');
});


for (let i = 0; i < cardsList.length; i++) {
    cardsList[i].addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Triggered');
        

        // open event page ->
        // 
    });
    cardsList[i].querySelector('.card-edit-button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        

        updateEventForm.classList.remove('hide');
        overlayFadeIn();
        overlay.classList.remove('hide');
        // hideOverlay();
    });
    cardsList[i].querySelector('.card-delete-button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        deleteEventDialog.classList.remove('hide');
        overlayFadeIn();
        overlay.classList.remove('hide');
        // hideOverlay();
    });

    cardsList[i].addEventListener('mousemove', () => {
        cardsList[i].querySelector('.card-modify-buttons-wrapper').classList.remove('hide');
    });

    cardsList[i].addEventListener('mouseleave', () => {
        cardsList[i].querySelector('.card-modify-buttons-wrapper').classList.add('hide');
    });
}