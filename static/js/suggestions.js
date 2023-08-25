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

const suggestionMainContent = document.querySelector('#suggestion-main-content');
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

// addSuggestionSubmitButton.addEventListener('click', (e) => {
//     e.preventDefault();
// });

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

// updateSuggestionSubmitButton.addEventListener('click', (e) => {
//     e.preventDefault();
// });

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

addSuggestionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Add event to database POST Request

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        body: JSON.stringify({
            title: form.get("add-suggestion-title"),
            description: form.get("add-suggestion-description"),
            posted_by: form.get("add-suggestion-host"),
            location: form.get("add-suggestion-location"),
            date: form.get("add-suggestion-date"),
            // type: form.get("add-suggestion-type"),
            // image: form.get("add-suggestion-upload")
        })
    };
    
    await fetch("/users/suggestions/new", options)
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

});



const createSuggestion = (suggestion) => {
    const { id, title, description, date_posted, posted_by, votes, is_resolved, is_activated, image, urgency_level, total} = suggestion;
    let suggestionElement = null;
    
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
    suggestionElement.querySelector('.card-host').textContent = posted_by;
    suggestionElement.querySelector('.card-vote-counter').value = votes;
    suggestionElement.querySelector('.card-comment-counter').textContent = total;
    suggestionElement.querySelector('.card-description').textContent = description;
    // suggestionElement.querySelector('.card-image-wrapper > img').src = String();

    suggestionElement.addEventListener('click', (e) => {
        e.preventDefault();
        
        window.location.assign(`/suggestions/${id}`);

    });

    suggestionElement.querySelector('.up-vote-button').addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let voteCount1 = votes;
        await fetch(`/users/suggestions/upvote/${id}`, { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
            try {
                suggestionElement.querySelector('.card-vote-counter').textContent = data;
            } catch (error) {
                console.log(error);
            }
           
            
        })
        .catch((error) => console.log(error));
    });

    suggestionElement.querySelector('.down-vote-button').addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let voteCount2 = votes;
            await fetch(`/users/suggestions/downvote/${id}`, { method: "POST" })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            try {
                suggestionElement.querySelector('.card-vote-counter').textContent = data;
            } catch (error) {
                console.log(error);
            }
        })
        .catch((error) => console.log(error));
    });

    return suggestionElement;
}


const fetchSuggestions = async () => {

    // const responses = await Promise.all(
    //     ids.map(async id => {
    //         const suggestionResponse = await fetch('/suggestions/all'); 
    //         const commentsResponse = await fetch('/suggestions/all'); 
    //     })
    // );
    await fetch('/suggestions/all')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        try {
            suggestionMainContent.textContent = "";
            data.forEach(suggestion => {
                // console.log(suggestion);
                let elem = createSuggestion(suggestion);
                
                console.log(elem);
                suggestionMainContent.appendChild(elem);
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