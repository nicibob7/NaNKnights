const carouselStrip = document.querySelector('#strip');
const carouselButtons = document.querySelector('#carousel-buttons');
const carouselLeftButton = document.querySelector('#carousel-left > button');
const carouselRightButton = document.querySelector('#carousel-right > button');
const eventsUpButton = document.querySelector('#events-up-button');
const eventsDownButton = document.querySelector('#events-down-button');
const suggestionsUpButton = document.querySelector('#suggestions-up-button');
const suggestionsDownButton = document.querySelector('#suggestions-down-button');
const eventStrip = document.querySelector('#events-strip');
const suggestionStrip = document.querySelector('#suggestions-strip');

let currentSlide = 0;
let slideLimit = 3;
let currentEvent = 0;
let eventsLimit = 5;
let currentSuggestion = 0;
let suggestionsLimit = 5;


const generateCarouselButtons = (amount=3) => {
    carouselButtons.textContent = '';
    for (let i = 0; i < 3; i++) {
        const button = document.createElement('div');
        button.id = 'circle-' + String(i+1);
        button.classList.add('carousel-circle-button');
        if (i == 0) button.classList.add('carousel-circle-button-selected');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlide = i;
            let tempButtons = carouselButtons.querySelectorAll('.carousel-circle-button');
            for (let j = 0; j < tempButtons.length; j++) {
                tempButtons[j].classList.remove('carousel-circle-button-selected');
            }
            button.classList.add('carousel-circle-button-selected');
            carouselStrip.style.left = String(i * -100) + '%';
            checkCurrentSlide();
        });

        carouselButtons.appendChild(button);
    }

    carouselButtons.querySelectorAll('.carousel-circle-button')[0].click();
    checkCurrentSlide();
}

const checkCurrentSlide = () => {
    if (currentSlide == 0) {
        carouselLeftButton.classList.add('hide');
    }
    else {
        carouselLeftButton.classList.remove('hide');
    }

    if (currentSlide == slideLimit-1) {
        carouselRightButton.classList.add('hide');
    }
    else {
        carouselRightButton.classList.remove('hide');
    }
    
}

const checkCurrentEvent = () => {
    if (currentEvent == 0) {
        eventsUpButton.classList.add('hide');
    }
    else {
        eventsUpButton.classList.remove('hide');
    }

    if (currentEvent == eventsLimit-1) {
        eventsDownButton.classList.add('hide');
    }
    else {
        eventsDownButton.classList.remove('hide');
    }
}

const checkCurrentSuggestion = () => {
    if (currentSuggestion == 0) {
        suggestionsUpButton.classList.add('hide');
    }
    else {
        suggestionsUpButton.classList.remove('hide');
    }

    if (currentSuggestion == suggestionsLimit-1) {
        suggestionsDownButton.classList.add('hide');
    }
    else {
        suggestionsDownButton.classList.remove('hide');
    }
}

const populateNewsCarousel = () => {

}

const populateEvents = () => {

}

const populateSuggestions = () => {

}

carouselLeftButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentSlide > 0) {
        carouselButtons.querySelectorAll('.carousel-circle-button')[currentSlide-1].click();
    }
});

carouselRightButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentSlide < slideLimit-1) {
        carouselButtons.querySelectorAll('.carousel-circle-button')[currentSlide+1].click();
    }
});


eventsUpButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentEvent > 0) {
        currentEvent--;
        eventStrip.style.top = String(currentEvent * -100) + '%';
        checkCurrentEvent();
    }
    
});

eventsDownButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentEvent < eventsLimit-1) {
        currentEvent++;
        eventStrip.style.top = String(currentEvent * -100) + '%';
        checkCurrentEvent();
    }
    
});

suggestionsUpButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentSuggestion > 0) {
        currentSuggestion--;
        suggestionStrip.style.top = String(currentSuggestion * -100) + '%';
        checkCurrentSuggestion();
    }
    
});

suggestionsDownButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentSuggestion < suggestionsLimit-1) {
        currentSuggestion++;
        suggestionStrip.style.top = String(currentSuggestion * -100) + '%';
        checkCurrentSuggestion();
    }
    
});


const init = () => {
    generateCarouselButtons(slideLimit);
    checkCurrentEvent();
    checkCurrentSuggestion();
    
}

init();