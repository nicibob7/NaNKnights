const filterButton = document.querySelector('#filter-button');
const filterButtonPath = document.querySelector('#filter-button > svg > path');
const filterDropdown = document.querySelector('#top-dropdown-box');
const overlay = document.querySelector('#overlay');
const filterForm = document.querySelector('#filter-form');
const addCommentButton = document.querySelector('#comment-add-button');
const addCommentForm = document.querySelector('#add-comment-form');
const updateNewsForm = document.querySelector('#update-news-form');
const updateNewsCloseButton = document.querySelector('#update-news-close-button');
const updateNewsCancelButton = document.querySelector('#update-news-cancel-button');
const updateNewsSubmitButton = document.querySelector('#update-news-submit-button');
const deleteNewsCancelButton = document.querySelector('#delete-news-cancel-button');
const deleteNewsButton = document.querySelector('#delete-news-button');
const deleteNewsDialog = document.querySelector('#delete-news-dialog');
const cardsList = document.querySelectorAll('.card');
const newsEditButton = document.querySelector('#news-edit-button');
const newsDeleteButton = document.querySelector('#news-delete-button');

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
    updateNewsForm.classList.add('hide');
    deleteNewsDialog.classList.add('hide');
}

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

newsEditButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // let idArray = (cardsList[i].id).split('-');
    // selectedID = idArray[idArray.length-1];

    

    updateNewsForm.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
    // hideOverlay();
});
newsDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // let idArray = (cardsList[i].id).split('-');
    // selectedID = idArray[idArray.length-1];

    deleteNewsDialog.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
    // hideOverlay();
});

/*
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

addNewsSubmitButton.addEventListener('click', (e) => {
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
            
            if (addNewsElements[j].value == "" || !addNewsElements[j].value) {
                emptyInput = true;
                break;
            }
        }
        
        if (!emptyInput) {
            addNewsSubmitButton.disabled = false;
        }
        else {
            addNewsSubmitButton.disabled = true;
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
        

        // open news page ->
        // 
    });
}

if(userType !== "admin"){
    newsEditButton.remove();
    newsDeleteButton.remove();
}