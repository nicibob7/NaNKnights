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

const populateNewsCarousel = async () => {
    const news = await fetch("/news/all")
    const newsItems = await news.json()

    const newsCard1Title = document.getElementById("news-card1-title")
    const newsCard1Date = document.getElementById("news-card1-date")
    const newsCard1Description = document.getElementById("news-card1-description")
    const newsCard1Type = document.getElementById("news-card1-type")

    const newsCard1 = [newsCard1Title, newsCard1Date, newsCard1Description, newsCard1Type]

    const newsCard2Title = document.getElementById("news-card2-title")
    const newsCard2Date = document.getElementById("news-card2-date")
    const newsCard2Description = document.getElementById("news-card2-description")
    const newsCard2Type = document.getElementById("news-card2-type")

    const newsCard2 = [newsCard2Title, newsCard2Date, newsCard2Description, newsCard2Type]

    const newsCard3Title = document.getElementById("news-card3-title")
    const newsCard3Date = document.getElementById("news-card3-date")
    const newsCard3Description = document.getElementById("news-card3-description")
    const newsCard3Type = document.getElementById("news-card3-type")

    const newsCard3 = [newsCard3Title, newsCard3Date, newsCard3Description, newsCard3Type]

    const newsCard4Title = document.getElementById("news-card4-title")
    const newsCard4Date = document.getElementById("news-card4-date")
    const newsCard4Description = document.getElementById("news-card4-description")
    const newsCard4Type = document.getElementById("news-card4-type")

    const newsCard4 = [newsCard4Title, newsCard4Date, newsCard4Description, newsCard4Type]

    const newsCard5Title = document.getElementById("news-card5-title")
    const newsCard5Date = document.getElementById("news-card5-date")
    const newsCard5Description = document.getElementById("news-card5-description")
    const newsCard5Type = document.getElementById("news-card5-type")

    const newsCard5 = [newsCard5Title, newsCard5Date, newsCard5Description, newsCard5Type]

    const newsCard6Title = document.getElementById("news-card6-title")
    const newsCard6Date = document.getElementById("news-card6-date")
    const newsCard6Description = document.getElementById("news-card6-description")
    const newsCard6Type = document.getElementById("news-card6-type")

    const newsCard6 = [newsCard6Title, newsCard6Date, newsCard6Description, newsCard6Type]

    const newsCard7Title = document.getElementById("news-card7-title")
    const newsCard7Date = document.getElementById("news-card7-date")
    const newsCard7Description = document.getElementById("news-card7-description")
    const newsCard7Type = document.getElementById("news-card7-type")

    const newsCard7 = [newsCard7Title, newsCard7Date, newsCard7Description, newsCard7Type]

    const newsCard8Title = document.getElementById("news-card8-title")
    const newsCard8Date = document.getElementById("news-card8-date")
    const newsCard8Description = document.getElementById("news-card8-description")
    const newsCard8Type = document.getElementById("news-card8-type")

    const newsCard8 = [newsCard8Title, newsCard8Date, newsCard8Description, newsCard8Type]

    const newsCards = [newsCard1, newsCard2, newsCard3, newsCard4, newsCard5, newsCard6, newsCard7, newsCard8]


    for(let i = 0; i < newsItems.length; i++){
        newsCards[i][0].innerHTML = newsItems[i].title
        newsCards[i][1].innerHTML = newsItems[i].date_posted
        newsCards[i][2].innerHTML = newsItems[i].description
        newsCards[i][3].innerHTML = newsItems[i].type
    }
}

const populateEvents = async () => {
    const events = await fetch("/events/all")
    const eventItems = await events.json()
    console.log(eventItems)

    const eventCard1Title = document.getElementById("event-card1-title")
    const eventCard1Date = document.getElementById("event-card1-date")
    const eventCard1Location = document.getElementById("event-card1-location")
    const eventCard1Host = document.getElementById("event-card1-host")
    const eventCard1Description = document.getElementById("event-card1-description")
    const eventCard1Type = document.getElementById("event-card1-type")

    const eventCard1 = [eventCard1Title, eventCard1Date, eventCard1Location, eventCard1Host, eventCard1Description, eventCard1Type]

    const eventCard2Title = document.getElementById("event-card2-title")
    const eventCard2Date = document.getElementById("event-card2-date")
    const eventCard2Location = document.getElementById("event-card2-location")
    const eventCard2Host = document.getElementById("event-card2-host")
    const eventCard2Description = document.getElementById("event-card2-description")
    const eventCard2Type = document.getElementById("event-card2-type")

    const eventCard2 = [eventCard2Title, eventCard2Date, eventCard2Location, eventCard2Host, eventCard2Description, eventCard2Type]

    const eventCard3Title = document.getElementById("event-card3-title")
    const eventCard3Date = document.getElementById("event-card3-date")
    const eventCard3Location = document.getElementById("event-card3-location")
    const eventCard3Host = document.getElementById("event-card3-host")
    const eventCard3Description = document.getElementById("event-card3-description")
    const eventCard3Type = document.getElementById("event-card3-type")

    const eventCard3 = [eventCard3Title, eventCard3Date, eventCard3Location, eventCard3Host, eventCard3Description, eventCard3Type]

    const eventCard4Title = document.getElementById("event-card4-title")
    const eventCard4Date = document.getElementById("event-card4-date")
    const eventCard4Location = document.getElementById("event-card4-location")
    const eventCard4Host = document.getElementById("event-card4-host")
    const eventCard4Description = document.getElementById("event-card4-description")
    const eventCard4Type = document.getElementById("event-card4-type")

    const eventCard4 = [eventCard4Title, eventCard4Date, eventCard4Location, eventCard4Host, eventCard4Description, eventCard4Type]

    const eventCard5Title = document.getElementById("event-card5-title")
    const eventCard5Date = document.getElementById("event-card5-date")
    const eventCard5Location = document.getElementById("event-card5-location")
    const eventCard5Host = document.getElementById("event-card5-host")
    const eventCard5Description = document.getElementById("event-card5-description")
    const eventCard5Type = document.getElementById("event-card5-type")

    const eventCard5 = [eventCard5Title, eventCard5Date, eventCard5Location, eventCard5Host, eventCard5Description, eventCard5Type]

    const eventCards = [eventCard1, eventCard2, eventCard3, eventCard4, eventCard5]
    console.log(eventCards)

    for(let i = 0; i < eventItems.length; i++){
        eventCards[i][0].innerHTML = eventItems[i].title
        eventCards[i][1].innerHTML = eventItems[i].date_posted
        eventCards[i][2].innerHTML = eventItems[i].location
        eventCards[i][3].innerHTML = eventItems[i].host
        eventCards[i][4].innerHTML = eventItems[i].description
        eventCards[i][5].innerHTML = eventItems[i].type
    }
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
    populateNewsCarousel();
    populateEvents();
    
}

init();