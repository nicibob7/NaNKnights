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

const suggestionMainContent = document.querySelector('#suggestion-main-content');
const suggestionCardContainer = document.querySelector('#suggestion-card-container');
const template = document.querySelector('template');

const commentsNumber = document.querySelector('#comments-number');
const commentsContainer = document.querySelector('#comments-container');

let selectedID = 0;
let voteCount = 0;

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

// suggestionEditButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // let idArray = (cardsList[i].id).split('-');
//     // selectedID = idArray[idArray.length-1];

    

//     updateSuggestionForm.classList.remove('hide');
//     overlayFadeIn();
//     overlay.classList.remove('hide');
//     // hideOverlay();
// });

// suggestionDeleteButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // let idArray = (cardsList[i].id).split('-');
//     // selectedID = idArray[idArray.length-1];

//     deleteSuggestionDialog.classList.remove('hide');
//     overlayFadeIn();
//     overlay.classList.remove('hide');
//     // hideOverlay();
// });

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
    // console.log(title);
    
    switch (userType) {
        case "guest":
            suggestionElement = template.content.querySelector('.card').cloneNode(true);
        break;
        case "user":
            suggestionElement = template.content.querySelector('.card').cloneNode(true);
        break;
        case "admin":
            suggestionElement = template.content.querySelector('.card').cloneNode(true);
        break;
        default:
            suggestionElement = template.content.querySelector('.card').cloneNode(true);
        break;
    }

    let tempDate = new Date(date_posted);
    voteCount = votes;
    suggestionElement.id = "suggestion-" + id; 
    suggestionElement.querySelector('.card-title').textContent = title;
    suggestionElement.querySelector('.card-date').textContent = tempDate.getDay() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear();
    suggestionElement.querySelector('.card-host').textContent = posted_by;
    suggestionElement.querySelector('.card-vote-counter').textContent = voteCount;
    suggestionElement.querySelector('.card-description').textContent = description;
    // suggestionElement.querySelector('.card-image-wrapper > img').src = String();

    

    suggestionElement.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Triggered');
    });

    suggestionElement.querySelector('.up-vote-button').addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch(`/users/suggestions/upvote/${parseInt(String(window.location.href).split('/')[4])}`, { method: "POST" })
        .then((response) => {
            console.log(response);
            if (response.status == 200) {
                try {
                    voteCount++;
                    suggestionElement.querySelector('.card-vote-counter').textContent = voteCount;
                } catch (error) {
                    console.log(error);
                }
            }
            // return response.json();
        })
        .then((data) => {
            
           
            
        })
        .catch((error) => console.log(error));
    });

    suggestionElement.querySelector('.down-vote-button').addEventListener('click', async (e) => {
        e.preventDefault();
            await fetch(`/users/suggestions/downvote/${parseInt(String(window.location.href).split('/')[4])}`, { method: "POST" })
        .then((response) => {
            console.log(response);

            if (response.status == 200) {
                try {
                    voteCount--;
                    suggestionElement.querySelector('.card-vote-counter').textContent = voteCount;
                } catch (error) {
                    console.log(error);
                }
            }
            // return response.json();
            
        })
        .then((data) => {
            
            
        })
        .catch((error) => console.log(error));
    });

    return suggestionElement;
}


const fetchSuggestions = async () => {
    await fetch(`/suggestion/${parseInt(String(window.location.href).split('/')[4])}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        try {
                suggestionCardContainer.textContent = "";
                // console.log(suggestion);
                let elem = createSuggestion(data);

                suggestionCardContainer.appendChild(elem);
                checkUserType();
        } catch (error) {
            console.log(error);
        }
        
    })
    .catch((error) => console.log(error.error));
}

const createComment = (commentData) => {
    const { id, suggestion_id, comment, date_posted, posted_by } = commentData;
    let commentElement = null;
    // console.log(title);
    let tempDate = new Date(date_posted);

    commentElement = template.content.querySelector('.comment').cloneNode(true);

    commentElement.id = "comment-" + id; 
    // commentElementData.querySelector('.comment-title').textContent = title;
    commentElement.querySelector('.comment-date').textContent = tempDate.getDay() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear();
    commentElement.querySelector('.comment-author').textContent = posted_by;
    commentElement.querySelector('.comment-text').textContent = comment;
    // commentElement.querySelector('.card-image-wrapper > img').src = String();

    // commentElement.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     // console.log('Triggered');
        

    // });

    return commentElement;
}

const fetchComments = async () => {
    await fetch(`/comment/${parseInt(String(window.location.href).split('/')[4])}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        commentsNumber.textContent = data.length;
        try {
                commentsContainer.textContent = "";
                // console.log(suggestion);
                data.forEach(c => {
                    let elem = createComment(c);
                    
                    console.log(elem);
                    commentsContainer.appendChild(elem);
                })
                
                

        } catch (error) {
            console.log(error);
        }
        
    })
    .catch((error) => console.log(error.error));
}

fetchSuggestions();
fetchComments();

const checkUserType = async () => {
    await getUserType();
    console.log(userType);
    // userType = "admin"
    if (userType == "admin") {
        console.log('fire');
        let modifyButtons = null;
        modifyButtons = template.content.querySelector('.card-modify-buttons-wrapper').cloneNode(true);
         modifyButtons.querySelector('.card-edit-button').addEventListener('click', (e) => {
               e.preventDefault();
        });
        
         modifyButtons.querySelector('.card-delete-button').addEventListener('click', (e) => {
              e.preventDefault();
        });

        suggestionMainContent.querySelector('.card').appendChild(modifyButtons);
    }
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