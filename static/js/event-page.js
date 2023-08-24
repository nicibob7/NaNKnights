const filterButton = document.querySelector('#filter-button');
const filterButtonPath = document.querySelector('#filter-button > svg > path');
const filterDropdown = document.querySelector('#top-dropdown-box');
const overlay = document.querySelector('#overlay');
const filterForm = document.querySelector('#filter-form');
const addCommentButton = document.querySelector('#comment-add-button');
const addCommentForm = document.querySelector('#add-comment-form');
const updateEventForm = document.querySelector('#update-event-form');
const updateEventCloseButton = document.querySelector('#update-event-close-button');
const updateEventCancelButton = document.querySelector('#update-event-cancel-button');
const updateEventSubmitButton = document.querySelector('#update-event-submit-button');
const deleteEventCancelButton = document.querySelector('#delete-event-cancel-button');
const deleteEventButton = document.querySelector('#delete-event-button');
const deleteEventDialog = document.querySelector('#delete-event-dialog');
const cardsList = document.querySelectorAll('.card');
const eventEditButton = document.querySelector('#event-edit-button');
const eventDeleteButton = document.querySelector('#event-delete-button');

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
    updateEventForm.classList.add('hide');
    deleteEventDialog.classList.add('hide');
}

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

eventEditButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // let idArray = (cardsList[i].id).split('-');
    // selectedID = idArray[idArray.length-1];

    

    updateEventForm.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
    // hideOverlay();
});
eventDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // let idArray = (cardsList[i].id).split('-');
    // selectedID = idArray[idArray.length-1];

    deleteEventDialog.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
    // hideOverlay();
});

/*
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

addEventSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
});
*/
/*




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
*/

addCommentButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (addCommentForm.classList.contains('add-comment-stretch')) {
        addCommentForm.classList.remove('add-comment-stretch');
    }
    else {
        addCommentForm.classList.add('add-comment-stretch');
    }
    
});

for (let i = 0; i < cardsList.length; i++) {
    cardsList[i].addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Triggered');
        

        // open event page ->
        // 
    });
}