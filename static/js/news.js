const filterButton = document.querySelector('#filter-button');
const filterButtonPath = document.querySelector('#filter-button > svg > path');
const filterDropdown = document.querySelector('#top-dropdown-box');
const addNewsForm = document.querySelector('#add-news-form');
const addNewsButton = document.querySelector('#add-news-button');
const addNewsUpload = document.querySelector('#add-news-upload');
const addNewsCloseButton = document.querySelector('#add-news-close-button');
const addNewsCancelButton = document.querySelector('#add-news-cancel-button');
const addNewsSubmitButton = document.querySelector('#add-news-submit-button');
const overlay = document.querySelector('#overlay');
const addNewsElements = document.querySelectorAll('.add-news-form-input');
const filterForm = document.querySelector('#filter-form');
const updateNewsForm = document.querySelector('#update-news-form');
const updateNewsCloseButton = document.querySelector('#update-news-close-button');
const updateNewsCancelButton = document.querySelector('#update-news-cancel-button');
const updateNewsSubmitButton = document.querySelector('#update-news-submit-button');
const deleteNewsCancelButton = document.querySelector('#delete-news-cancel-button');
const deleteNewsButton = document.querySelector('#delete-news-button');
const deleteNewsDialog = document.querySelector('#delete-news-dialog');
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
    addNewsForm.classList.add('hide');
    updateNewsForm.classList.add('hide');
    deleteNewsDialog.classList.add('hide');
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

addNewsUpload.addEventListener('change', (e) => {
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

addNewsCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    //overlayFadeOut();
    // overlay.classList.add('hide');
    hideOverlay();
});

addNewsCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

addNewsSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
});

updateNewsCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    //overlayFadeOut();
    // overlay.classList.add('hide');
    hideOverlay();
});

updateNewsCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

updateNewsSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
});

deleteNewsCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

deleteNewsButton.addEventListener('click', (e) => {
    e.preventDefault();
});

addNewsButton.addEventListener('click', (e) => {
    e.preventDefault();
    addNewsForm.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
});

addNewsForm.addEventListener('input', (e) => {
    e.preventDefault();
    let emptyInput = false;

        for (let j = 0; j < addNewsElements.length; j++) {
            console.log(addNewsElements[j].value);
            if (addNewsElements[j].value == "" || !addNewsElements[j].value) {
                emptyInput = true;
                break;
            }

        }
        console.log(emptyInput);
        if (!emptyInput) {
            addNewsSubmitButton.disabled = false;
        }
        else {
            addNewsSubmitButton.disabled = true;
        }
});

addNewsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Fired');
});


for (let i = 0; i < cardsList.length; i++) {
    cardsList[i].querySelector('.card-edit-button').addEventListener('click', (e) => {
        e.preventDefault();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        

        updateNewsForm.classList.remove('hide');
        overlay.classList.remove('hide');
        // hideOverlay();
    });
    cardsList[i].querySelector('.card-delete-button').addEventListener('click', (e) => {
        e.preventDefault();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        deleteNewsDialog.classList.remove('hide');
        overlay.classList.remove('hide');
        // hideOverlay();
    });

    cardsList[i].addEventListener('mousemove', () => {
        cardsList[i].querySelector('.card-edit-button').classList.remove('hide');
        cardsList[i].querySelector('.card-delete-button').classList.remove('hide');
    });

    cardsList[i].addEventListener('mouseleave', () => {
        cardsList[i].querySelector('.card-edit-button').classList.add('hide');
        cardsList[i].querySelector('.card-delete-button').classList.add('hide');
    });
}