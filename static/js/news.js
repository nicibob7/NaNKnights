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
            const maxAllowedSize = 10 * 1024 * 1024;
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

// addNewsSubmitButton.addEventListener('click', (e) => {
//     e.preventDefault();
// });

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

// updateNewsSubmitButton.addEventListener('click', (e) => {
//     e.preventDefault();
// });

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

addNewsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Add news to database POST Request

    const form = new FormData(e.target);

    console.log({
        title: form.get("add-news-title"),
        description: form.get("add-news-description"),
        type: form.get("add-news-type"),
        image: form.get("add-news-upload")
    });

    const options = {
        method: "POST",
        body: {
            title: form.get("add-news-title"),
            description: form.get("add-news-description"),
            type: form.get("add-news-type"),
            image: form.get("add-news-upload")
        }
    };
    
    await fetch("/admins/news", options)
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

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
            newsElement = template.content.querySelector('.editable-card').cloneNode(true);
            newsElement.querySelector('.card-edit-button').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // let idArray = (cardsList[i].id).split('-');
                // selectedID = idArray[idArray.length-1];
        
                updateNewsForm.classList.remove('hide');
                overlayFadeIn();
                overlay.classList.remove('hide');
                // hideOverlay();
            });
            newsElement.querySelector('.card-delete-button').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // let idArray = (cardsList[i].id).split('-');
                // selectedID = idArray[idArray.length-1];
        
                deleteNewsDialog.classList.remove('hide');
                overlayFadeIn();
                overlay.classList.remove('hide');
                // hideOverlay();
            });
        
            newsElement.addEventListener('mousemove', () => {
                newsElement.querySelector('.card-edit-button').classList.remove('hide');
                newsElement.querySelector('.card-delete-button').classList.remove('hide');
            });
        
            newsElement.addEventListener('mouseleave', () => {
                newsElement.querySelector('.card-edit-button').classList.add('hide');
                newsElement.querySelector('.card-delete-button').classList.add('hide');
            });
        break;
        default:
            newsElement = template.content.querySelector('.card').cloneNode(true);
        break;
    }

    let tempDate = new Date(date_posted);

    newsElement.id = "news-" + id; 
    newsElement.querySelector('.card-title').textContent = title;
    newsElement.querySelector('.card-date').textContent = tempDate.getDay() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear();
    // newsElement.querySelector('.card-date').textContent = "15/06/2023";
    newsElement.querySelector('.card-description').textContent = description;
    newsElement.querySelector('.card-type').textContent = type;
    // newsElement.querySelector('.card-image-wrapper > img').src = String();

    newsElement.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Triggered');
        
        window.location.assign(`/news-page/${id}`);

        // open news page ->
        // 
    });

    return newsElement;
    // news.
}


const fetchNews = async () => {
    await fetch('/news/all')
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        try {
            newsMainContent.textContent = "";
            data.forEach(news => {
                // console.log(news);
                let elem = createNews(news);
                
                console.log(elem);
                newsMainContent.appendChild(elem);
            })
        } catch (error) {
            console.log(error);
        }
        
    })
    .catch((error) => console.log(error.error));
}

fetchNews();



const checkUserType = async () => {
    await getUserType();
    if (userType != "admin") addNewsButton.remove();
}

checkUserType();





// checkUserType();

/*
for (let i = 0; i < cardsList.length; i++) {
    cardsList[i].addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Triggered');
        

        // open news page ->
        // 
    });
    cardsList[i].querySelector('.card-edit-button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        

        updateNewsForm.classList.remove('hide');
        overlayFadeIn();
        overlay.classList.remove('hide');
        // hideOverlay();
    });
    cardsList[i].querySelector('.card-delete-button').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // let idArray = (cardsList[i].id).split('-');
        // selectedID = idArray[idArray.length-1];

        deleteNewsDialog.classList.remove('hide');
        overlayFadeIn();
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

*/