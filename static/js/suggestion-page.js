const filterButton = document.querySelector('#filter-button');
const filterButtonPath = document.querySelector('#filter-button > svg > path');
const filterDropdown = document.querySelector('#top-dropdown-box');
const overlay = document.querySelector('#overlay');
const filterForm = document.querySelector('#filter-form');
const addCommentButton = document.querySelector('#comment-add-button');
const addCommentForm = document.querySelector('#add-comment-form');
const updateSuggestionForm = document.querySelector('#update-suggestion-form');
const updateSuggestionCloseButton = document.querySelector('#update-suggestion-close-button');
const updateSuggestionCancelButton = document.querySelector('#update-suggestion-cancel-button');
const updateSuggestionSubmitButton = document.querySelector('#update-suggestion-submit-button');
const deleteSuggestionCancelButton = document.querySelector('#delete-suggestion-cancel-button');
const deleteSuggestionButton = document.querySelector('#delete-suggestion-button');
const deleteSuggestionDialog = document.querySelector('#delete-suggestion-dialog');
const cardsList = document.querySelectorAll('.card');
const suggestionEditButton = document.querySelector('#suggestion-edit-button');
const suggestionDeleteButton = document.querySelector('#suggestion-delete-button');

const suggestionCardContainer = document.querySelector('#suggestion-card-container');
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
    updateSuggestionForm.classList.add('hide');
    deleteSuggestionDialog.classList.add('hide');
}

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

suggestionEditButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // let idArray = (cardsList[i].id).split('-');
    // selectedID = idArray[idArray.length-1];

    

    updateSuggestionForm.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
    // hideOverlay();
});

suggestionDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // let idArray = (cardsList[i].id).split('-');
    // selectedID = idArray[idArray.length-1];

    deleteSuggestionDialog.classList.remove('hide');
    overlayFadeIn();
    overlay.classList.remove('hide');
    // hideOverlay();
});

/*
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

addSuggestionSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
});
*/
/*




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

const createSuggestion = (suggestion) => {
    const { id, title, description, date_posted, posted_by, votes, is_resolved, is_activated, image, urgency_level} = suggestion;
    let suggestionElement = null;
    console.log(title);
    
    switch (userType) {
        case "guest":
            suggestionElement = template.content.querySelector('.card').cloneNode(true);
        break;
        case "user":
            suggestionElement = template.content.querySelector('.card').cloneNode(true);
        break;
        case "admin":
            suggestionElement = template.content.querySelector('.editable-card').cloneNode(true);
            suggestionElement.querySelector('.card-edit-button').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // let idArray = (cardsList[i].id).split('-');
                // selectedID = idArray[idArray.length-1];
        
                
        
                updateSuggestionForm.classList.remove('hide');
                overlayFadeIn();
                overlay.classList.remove('hide');
                // hideOverlay();
            });
            suggestionElement.querySelector('.card-delete-button').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // let idArray = (cardsList[i].id).split('-');
                // selectedID = idArray[idArray.length-1];
        
                deleteSuggestionDialog.classList.remove('hide');
                overlayFadeIn();
                overlay.classList.remove('hide');
                // hideOverlay();
            });
        
            suggestionElement.addEventListener('mousemove', () => {
                suggestionElement.querySelector('.card-edit-button').classList.remove('hide');
                suggestionElement.querySelector('.card-delete-button').classList.remove('hide');
            });
        
            suggestionElement.addEventListener('mouseleave', () => {
                suggestionElement.querySelector('.card-edit-button').classList.add('hide');
                suggestionElement.querySelector('.card-delete-button').classList.add('hide');
            });
        break;
        default:
            suggestionElement = template.content.querySelector('.card').cloneNode(true);
        break;
    }

    let tempDate = new Date(date_posted);

    suggestionElement.id = "suggestion-" + id; 
    suggestionElement.querySelector('.card-title').textContent = title;
    suggestionElement.querySelector('.card-date').textContent = tempDate.getDay() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear();
    // suggestionElement.querySelector('.card-host').textContent = posted_by;
    suggestionElement.querySelector('.card-vote-counter').textContent = votes;
    suggestionElement.querySelector('.card-description').textContent = description;
    // suggestionElement.querySelector('.card-image-wrapper > img').src = String();

    suggestionElement.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Triggered');
        

    });

    return suggestionElement;
}


const fetchSuggestions = async () => {
    await fetch(`/suggestions/${String(window.location.href).split('/')[4]}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        try {
            suggestionCardContainer.textContent = "";
            data.forEach(suggestion => {
                // console.log(suggestion);
                let elem = createSuggestion(suggestion);
                
                console.log(elem);
                suggestionCardContainer.appendChild(elem);
            })
        } catch (error) {
            console.log(error);
        }
        
    })
    .catch((error) => console.log(error.error));
}

fetchSuggestions();

if (userType != "admin") {
    // addSuggestionButton.remove();
}

// for (let i = 0; i < cardsList.length; i++) {
//     cardsList[i].addEventListener('click', (e) => {
//         e.preventDefault();
//         // console.log('Triggered');
        

//         // open event page ->
//         // 
//     });
// }


// fetch('', {method: "POST"})
//     .then(res => res.json())
//     .then(data => {
//         document.querySelector("#response").textContent = data.description + " posted by: " + data.posted_by + " at: "+ data.date_posted;
//     })
//     .catch(err => console.log(err));