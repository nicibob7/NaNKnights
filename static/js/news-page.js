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

const newsMainContent = document.querySelector('#news-main-content');
const template = document.querySelector('template');

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




const createNews = (news) => {
    const { id, title, description, date_posted, posted_by, type, image } = news;
    let newsElement = null;
    
    console.log(title);
    
    switch (userType) {
        case "guest":
            newsElement = template.content.querySelector('.card').cloneNode(true);
        break;
        case "user":
            newsElement = template.content.querySelector('.card').cloneNode(true);
        break;
        case "admin":
            newsElement = template.content.querySelector('.card').cloneNode(true);
            
        break;
        default:
            newsElement = template.content.querySelector('.card').cloneNode(true);
        break;
    }

    let tempDate = new Date(date_posted);
    let base64String = btoa([].reduce.call(new Uint8Array(image),function(p,c){return p+String.fromCharCode(c)},''));
    // console.log(base64String);

    let arrayBufferView = new Uint8Array(image);
    /*
    var blob = new Blob( [ image ], { type: "image/jpeg" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );
    console.log(imageUrl);
    // console.log(arrayBufferView);*/
    let date_spit = new Date(date_posted).toDateString().split(' ');

    selectedID = id;
    newsElement.id = "news-" + id; 
    newsElement.querySelector('.card-title').textContent = title;
    newsElement.querySelector('.card-date').textContent = date_spit[0] + " at " + date_spit[1] + "-" + date_spit[2] + "-" + date_spit[3];

    // newsElement.querySelector('.card-date').textContent = "15/06/2023";
    newsElement.querySelector('.card-description').textContent = description;
    newsElement.querySelector('.card-type').textContent = type;
    // newsElement.querySelector('.card-image-wrapper > img').src = imageUrl;

    

    return newsElement;
}


const fetchNews = async () => {
    await fetch(`/news/${parseInt(String(window.location.href).split('/')[4])}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        try {
            newsMainContent.textContent = "";
                // console.log(news);
            let elem = createNews(data);
                
            console.log(elem);
            newsMainContent.appendChild(elem);
           
        } catch (error) {
            console.log(error);
        }
        
    })
    .catch((error) => console.log(error.error));
}

fetchNews();

const checkUserType = async () => {
    await getUserType();
    if (userType == "admin") {
        let modifyButtons = null;
        modifyButtons = template.content.querySelector('.card-modify-buttons-wrapper').cloneNode(true);
         modifyButtons.querySelector('.card-edit-button').addEventListener('click', (e) => {
               e.preventDefault();
        });
        
         modifyButtons.querySelector('.card-delete-button').addEventListener('click', (e) => {
              e.preventDefault();
        });

        newsMainContent.appendChild(modifyButtons);
    }
    // if (userType != "admin") addNewsButton.remove();
}

checkUserType();

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

// addCommentButton.addEventListener('click', (e) => {
//     e.preventDefault();

//     if (addCommentForm.classList.contains('add-comment-stretch')) {
//         addCommentForm.classList.remove('add-comment-stretch');
//     }
//     else {
//         addCommentForm.classList.add('add-comment-stretch');
//     }
    
// });

// for (let i = 0; i < cardsList.length; i++) {
//     cardsList[i].addEventListener('click', (e) => {
//         e.preventDefault();
//         // console.log('Triggered');
        

        // open news page ->
        // 
//     });
// }

if(userType !== "admin"){
    newsEditButton.remove();
    newsDeleteButton.remove();
}
