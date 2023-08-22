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

function overlayHide() {
    document.getElementById('overlay').style.opacity = (parseFloat(document.getElementById('overlay').style.opacity) - 0.1);
    if (document.getElementById('overlay').style.opacity > 0) {
        setTimeout(overlayHide, 20);
    }
    
}

function overlayFadeOut() {
    document.getElementById('overlay').style.opacity = 1;
    document.getElementById('overlay').style.display = 'flex';
    setTimeout(overlayHide, 20);
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
    overlay.classList.add('hide');
    
});

addNewsCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    overlay.classList.add('hide');
    
});

addNewsButton.addEventListener('click', (e) => {
    e.preventDefault();
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


// for (let i = 0; i < addNewsElements.length; i++) {
//     console.log(addNewsElements[i].value);
//     addNewsElements[i].addEventListener('change', () => {
//         let emptyInput = false;

//         for (let j = 0; j < addNewsElements.length; j++) {
//             console.log(addNewsElements[j].value);
//             if (addNewsElements[j].value == "" || !addNewsElements[j].value) {
//                 emptyInput = true;
//                 break;
//             }

//         }
//         console.log(emptyInput);
//         if (!emptyInput) {
//             addNewsSubmitButton.disabled = false;
//         }
//         else {
//             addNewsSubmitButton.disabled = true;
//         }
//     });
// }