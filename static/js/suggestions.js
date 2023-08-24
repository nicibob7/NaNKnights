const filterButton = document.querySelector('#filter-button');
const filterButtonPath = document.querySelector('#filter-button > svg > path');
const filterDropdown = document.querySelector('#top-dropdown-box');
const addSuggestionForm = document.querySelector('#add-suggestion-form');
const addSuggestionButton = document.querySelector('#add-suggestion-button');
const addSuggestionUpload = document.querySelector('#add-suggestion-upload');
const addSuggestionCloseButton = document.querySelector('#add-suggestion-close-button');
const addSuggestionCancelButton = document.querySelector('#add-suggestion-cancel-button');
const addSuggestionSubmitButton = document.querySelector('#add-suggestion-submit-button');
const overlay = document.querySelector('#overlay');
const addSuggestionElements = document.querySelectorAll('.add-suggestion-form-input');
const filterForm = document.querySelector('#filter-form');
const updateSuggestionForm = document.querySelector('#update-suggestion-form');
const updateSuggestionCloseButton = document.querySelector('#update-suggestion-close-button');
const updateSuggestionCancelButton = document.querySelector('#update-suggestion-cancel-button');
const updateSuggestionSubmitButton = document.querySelector('#update-suggestion-submit-button');
const deleteSuggestionCancelButton = document.querySelector('#delete-suggestion-cancel-button');
const deleteSuggestionButton = document.querySelector('#delete-suggestion-button');
const deleteSuggestionDialog = document.querySelector('#delete-suggestion-dialog');
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
    addSuggestionForm.classList.add('hide');
    updateSuggestionForm.classList.add('hide');
    deleteSuggestionDialog.classList.add('hide');
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

addSuggestionUpload.addEventListener('change', (e) => {
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

addSuggestionCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    //overlayFadeOut();
    // overlay.classList.add('hide');
    hideOverlay();
});

addSuggestionCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

addSuggestionSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
});

updateSuggestionCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    //overlayFadeOut();
    // overlay.classList.add('hide');
    hideOverlay();
});

updateSuggestionCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

updateSuggestionSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
});

deleteSuggestionCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

deleteSuggestionButton.addEventListener('click', (e) => {
    e.preventDefault();
});

addSuggestionButton.addEventListener('click', (e) => {
    e.preventDefault();
    addSuggestionForm.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
});

addSuggestionForm.addEventListener('input', (e) => {
    e.preventDefault();
    let emptyInput = false;

        for (let j = 0; j < addSuggestionElements.length; j++) {
            
            if (addSuggestionElements[j].value == "" || !addSuggestionElements[j].value) {
                emptyInput = true;
                break;
            }
        }
        
        if (!emptyInput) {
            addSuggestionSubmitButton.disabled = false;
        }
        else {
            addSuggestionSubmitButton.disabled = true;
        }
});

addSuggestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add suggestion to database POST Request
    console.log('Fired');
});


for (let i = 0; i < cardsList.length; i++) {
    cardsList[i].addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Triggered');
        

        // open suggestions page ->
        // 
    });
    cardsList[i].querySelector('.up-vote-button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        // up vote post ->

    });

    cardsList[i].querySelector('.down-vote-button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        // down vote post ->

    });

    cardsList[i].querySelector('.card-edit-button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        

        updateSuggestionForm.classList.remove('hide');
        overlayFadeIn();
        overlay.classList.remove('hide');
        // hideOverlay();
    });
    cardsList[i].querySelector('.card-delete-button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        deleteSuggestionDialog.classList.remove('hide');
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