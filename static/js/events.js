const filterButton = document.querySelector('#filter-button');
const filterButtonPath = document.querySelector('#filter-button > svg > path');
const filterDropdown = document.querySelector('#top-dropdown-box');
const addEventForm = document.querySelector('#add-event-form');
const addEventButton = document.querySelector('#add-event-button');
const addEventUpload = document.querySelector('#add-event-upload');
const addEventCloseButton = document.querySelector('#add-event-close-button');
const addEventCancelButton = document.querySelector('#add-event-cancel-button');
const addEventSubmitButton = document.querySelector('#add-event-submit-button');
const overlay = document.querySelector('#overlay');
const addEventElements = document.querySelectorAll('.add-event-form-input');
const filterForm = document.querySelector('#filter-form');
const updateEventForm = document.querySelector('#update-event-form');
const updateEventCloseButton = document.querySelector('#update-event-close-button');
const updateEventCancelButton = document.querySelector('#update-event-cancel-button');
const updateEventSubmitButton = document.querySelector('#update-event-submit-button');
const deleteEventCancelButton = document.querySelector('#delete-event-cancel-button');
const deleteEventButton = document.querySelector('#delete-event-button');
const deleteEventDialog = document.querySelector('#delete-event-dialog');
const cardsList = document.querySelectorAll('.card');

const eventMainContent = document.querySelector('#event-main-content');
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
    addEventForm.classList.add('hide');
    updateEventForm.classList.add('hide');
    deleteEventDialog.classList.add('hide');
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

addEventCloseButton.addEventListener('click', (e) => {
    e.preventDefault();
    //overlayFadeOut();
    // overlay.classList.add('hide');
    hideOverlay();
});

addEventCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

// addEventSubmitButton.addEventListener('click', (e) => {
//     e.preventDefault();
// });

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

// updateEventSubmitButton.addEventListener('click', (e) => {
//     e.preventDefault();
// });

deleteEventCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
   //overlayFadeOut();
    hideOverlay();
    
});

deleteEventButton.addEventListener('click', (e) => {
    e.preventDefault();
});

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

addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add event to database POST Request
    console.log('Fired');
});


addEventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Add event to database POST Request

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        body: JSON.stringify({
            title: form.get("add-event-title"),
            description: form.get("add-event-description"),
            posted_by: form.get("add-event-host"),
            location: form.get("add-event-location"),
            date: form.get("add-event-date"),
            // type: form.get("add-event-type"),
            // image: form.get("add-event-upload")
        })
    };
    
    await fetch("/users/events/new", options)
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

});



const createEvent = (event) => {
    const { id, title, description, date_posted, posted_by, location, date, image, type, volunteers } = event;
    let eventElement = null;

    switch (userType) {
        case "guest":
            eventElement = template.content.querySelector('.card').cloneNode(true);
            eventElement.querySelector('.card-volunteer-counter').textContent = volunteers.length;
        break;
        case "user":
            eventElement = template.content.querySelector('.card').cloneNode(true);
            eventElement.querySelector('.card-volunteer-counter').textContent = volunteers.length;
        break;
        case "admin":
            eventElement = template.content.querySelector('.editable-card').cloneNode(true);
            eventElement.querySelector('.card-volunteer-counter').textContent = volunteers.length;
            eventElement.querySelector('.card-edit-button').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // let idArray = (cardsList[i].id).split('-');
                // selectedID = idArray[idArray.length-1];
        
                updateEventForm.classList.remove('hide');
                overlayFadeIn();
                overlay.classList.remove('hide');
                // hideOverlay();
            });
            eventElement.querySelector('.card-delete-button').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // let idArray = (cardsList[i].id).split('-');
                // selectedID = idArray[idArray.length-1];
        
                deleteEventDialog.classList.remove('hide');
                overlayFadeIn();
                overlay.classList.remove('hide');
                // hideOverlay();
            });
        
            eventElement.addEventListener('mousemove', () => {
                eventElement.querySelector('.card-edit-button').classList.remove('hide');
                eventElement.querySelector('.card-delete-button').classList.remove('hide');
            });
        
            eventElement.addEventListener('mouseleave', () => {
                eventElement.querySelector('.card-edit-button').classList.add('hide');
                eventElement.querySelector('.card-delete-button').classList.add('hide');
            });
        break;
        default:
            eventElement = template.content.querySelector('.card').cloneNode(true);
        break;
    }

    eventElement.id = "event-" + id; 
    eventElement.querySelector('.card-title').textContent = title;

    let date_spit = new Date(date).toDateString().split(' ');

    eventElement.querySelector('.card-date').textContent = date_spit[0] + " at " + date_spit[1] + "-" + date_spit[2] + "-" + date_spit[3];
    eventElement.querySelector('.card-location').textContent = location;
    eventElement.querySelector('.card-type').textContent = type;
    eventElement.querySelector('.card-host').textContent = posted_by;
    eventElement.querySelector('.card-description').textContent = description;
    // eventElement.querySelector('.card-image-wrapper > img').src = String();

    eventElement.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('Triggered');
        
        window.location.assign(`/event-page/${id}`);

        // open event page ->
        // 
    });

    return eventElement;
    // event.
}

const fetchEvents = async () => {
    await fetch('/events/all')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        try {
            eventMainContent.textContent = "";
            data.forEach(event => {
                // console.log(event);
                let elem = createEvent(event);
                
                console.log(elem);
                eventMainContent.appendChild(elem);
            })
        } catch (error) {
            console.log(error);
        }
        
    })
    .catch((error) => console.log(error.error));
}

fetchEvents();

if (userType === "guest") {
    addEventButton.remove();
}
