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

const eventWrapper1 = document.createElement('div')
eventWrapper1.innerHTML =             `<svg class="comment-image counter-image" width="35" height="31" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="34" height="25" rx="2" fill="#D9D9D9"/>
<path d="M31.1483 28.8355L25.6347 24.99L30.9721 22.1157L31.1483 28.8355Z" fill="#D9D9D9"/>
<path d="M7 6H27V9H7V6Z" fill="white"/>
<rect x="7" y="11" width="20" height="3" fill="white"/>
<rect x="7" y="16" width="20" height="3" fill="white"/>
</svg>`
eventWrapper1.classList.add("counter-wrapper")
eventWrapper1.classList.add("push-right")


console.log(eventWrapper1)
const eventWrapper2 = document.createElement('div')
eventWrapper2.innerHTML =             `<svg class="volunteer-image counter-image" width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect class="volunteer-image-rect" x="7.56226" y="2" width="4" height="15" rx="1" fill="#F5DE6A"/>
<rect class="volunteer-image-rect" y="17.8467" width="4.11361" height="11.8038" rx="1" transform="rotate(-43.7887 0 17.8467)" fill="#F5DE6A"/>
<rect class="volunteer-image-rect" x="12.5623" width="4" height="14" rx="1" fill="#F5DE6A"/>
<rect class="volunteer-image-rect" x="17.5623" y="2" width="4" height="14" rx="1" fill="#F5DE6A"/>
<rect class="volunteer-image-rect" x="22.5623" y="5" width="4" height="14" rx="1" fill="#F5DE6A"/>
<rect class="volunteer-image-rect" x="7.56226" y="13" width="19" height="15" rx="3" fill="#F5DE6A"/>
</svg>`
eventWrapper2.classList.add("counter-wrapper")
console.log(eventWrapper2)


const newsSlide = document.querySelector('#news-slide')

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

const populateNewsCarousel = (item) => {
    const { title, description, date_posted, type } = item


    const newsCard = document.createElement("div")
    newsCard.classList.add("news-card")
    const a = document.createElement("a")
    a.href = "#"
    const newsImage = document.createElement("img")
    newsImage.src = "./res/wholesale-news-image.jpg"
    newsImage.classList.add("news-card-image")
    const newsTextWrapper = document.createElement("div")
    newsTextWrapper.classList.add("news-text-wrapper")
    const newsTitle = document.createElement("h2")
    newsTitle.classList.add("news-card-title")
    newsTitle.classList.add("news-el")
    newsTitle.textContent = title
    const newsDate = document.createElement("h3")
    newsDate.classList.add("news-card-date")
    newsDate.classList.add("news-el")
    newsDate.textContent = date_posted
    const newsDescription = document.createElement("p")
    newsDescription.classList.add("news-card-description")
    newsDescription.classList.add("news-el")
    newsDescription.textContent = description
    const newsType = document.createElement("h3")
    newsType.classList.add("news-card-type")
    newsType.classList.add("news-el")
    newsType.textContent = type

    newsTextWrapper.appendChild(newsTitle)
    newsTextWrapper.appendChild(newsDate)
    newsTextWrapper.appendChild(newsDescription)
    newsTextWrapper.appendChild(newsType)

    a.appendChild(newsImage)
    a.appendChild(newsTextWrapper)

    newsCard.appendChild(a)

    return newsCard
}

const loadNews = async () => {

    const response = await fetch("/news/all");

    if (response.status == 200) {
        const news = await response.json();
        const slides = Math.ceil(news.length / 3)
        for(let i = 0; i < slides; i++){
            const slide = document.createElement("div")
            slide.classList.add("slide")
            slide.textContent = "";
            for(let j = 0; j < news.length; j++){
                const elem = populateNewsCarousel(news[j])
                slide.appendChild(elem)
            }
            carouselStrip.appendChild(slide)
        }
    } else {
        console.log("Hello")
    }

}

const populateEvents = (item) => {

    const { title, date_posted, location, description, type, host } = item
    
    let tempDate = new Date(date_posted);

    const eventSpacing = document.createElement("div")
    eventSpacing.classList.add("card")
    eventSpacing.classList.add("card-spacing")

    const a = document.createElement("a")
    a.classList.add("card-link")
    a.href = "#"

    const eventImageWrapper = document.createElement("div")
    eventImageWrapper.classList.add("card-image-wrapper")

    const eventImage = document.createElement("img")
    eventImage.src = "./res/tram-image.png"

    const eventTextWrapper = document.createElement("div")
    eventTextWrapper.classList.add("card-text-wrapper")

    const eventTextTop = document.createElement("div")
    eventTextTop.classList.add("card-text-top")
    eventTextTop.classList.add("card-text-flex")
    eventTextTop.classList.add("card-text-padder")

    const eventTitle = document.createElement("div")
    eventTitle.classList.add("card-title")
    eventTitle.classList.add("card-text")
    eventTitle.textContent = title

    const eventDate = document.createElement("div")
    eventDate.classList.add("card-date")
    eventDate.classList.add("card-text")
    eventDate.classList.add("push-right")
    eventDate.textContent = tempDate.getDay() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear()

    const secondText = document.createElement("div")
    secondText.classList.add("card-text-second")
    secondText.classList.add("card-text-flex")
    secondText.classList.add("card-text-padder")

    const eventLocation = document.createElement("div")
    eventLocation.classList.add("card-location")
    eventLocation.classList.add("card-text")
    eventLocation.textContent = location

    const eventHost = document.createElement("div")
    eventHost.classList.add("card-host")
    eventHost.classList.add("card-text")
    eventHost.classList.add("push-right")
    eventHost.textContent = host

    const thirdText = document.createElement("div")
    thirdText.classList.add("card-text-third")
    thirdText.classList.add("card-text-flex")
    thirdText.classList.add("card-text-padder")

    const eventDescription = document.createElement("p")
    eventDescription.classList.add("card-description")
    eventDescription.classList.add("card-text")
    eventDescription.textContent = description

    const eventTextBottom = document.createElement("div")
    eventTextBottom.classList.add("card-text-bottom")
    eventTextBottom.classList.add("card-text-flex")
    eventTextBottom.classList.add("card-text-padder")
    eventTextBottom.classList.add("push-bottom")

    const eventType = document.createElement("h2")
    eventType.classList.add("card-type")
    eventType.classList.add("card-text")
    eventType.textContent = type

    const counterWrapper = document.createElement("div")
    counterWrapper.classList.add("counter-wrapper")
    counterWrapper.classList.add("push-right")
    counterWrapper.innerHTML = `<svg class="comment-image counter-image" width="35" height="31" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="34" height="25" rx="2" fill="#D9D9D9"/>
    <path d="M31.1483 28.8355L25.6347 24.99L30.9721 22.1157L31.1483 28.8355Z" fill="#D9D9D9"/>
    <path d="M7 6H27V9H7V6Z" fill="white"/>
    <rect x="7" y="11" width="20" height="3" fill="white"/>
    <rect x="7" y="16" width="20" height="3" fill="white"/>
    </svg><p class="card-comment-counter card-text card-counter">0</p>`

    const svg1 = document.createElement("svg")
    svg1.classList.add("comment-image")
    svg1.classList.add("counter-image")

    const eventCommentCounter = document.createElement("p")
    eventCommentCounter.classList.add("card-comment-counter")
    eventCommentCounter.classList.add("card-text")
    eventCommentCounter.classList.add("card-counter")

    const counterWrapper2 = document.createElement("div")
    counterWrapper2.classList.add("counter-wrapper")
    counterWrapper2.innerHTML=`<svg class="volunteer-image counter-image" width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect class="volunteer-image-rect" x="7.56226" y="2" width="4" height="15" rx="1" fill="#F5DE6A"/>
    <rect class="volunteer-image-rect" y="17.8467" width="4.11361" height="11.8038" rx="1" transform="rotate(-43.7887 0 17.8467)" fill="#F5DE6A"/>
    <rect class="volunteer-image-rect" x="12.5623" width="4" height="14" rx="1" fill="#F5DE6A"/>
    <rect class="volunteer-image-rect" x="17.5623" y="2" width="4" height="14" rx="1" fill="#F5DE6A"/>
    <rect class="volunteer-image-rect" x="22.5623" y="5" width="4" height="14" rx="1" fill="#F5DE6A"/>
    <rect class="volunteer-image-rect" x="7.56226" y="13" width="19" height="15" rx="3" fill="#F5DE6A"/>
    </svg><p class="card-volunteer-counter card-text card-counter">0</p>`

    const svg2 = document.createElement("svg")
    svg2.classList.add("volunteer-image")
    svg2.classList.add("counter-image")

    const eventVolunteerCounter = document.createElement("p")
    eventVolunteerCounter.classList.add("card-volunteer-counter")
    eventVolunteerCounter.classList.add("card-text")
    eventVolunteerCounter.classList.add("card-counter")

    eventImageWrapper.appendChild(eventImage)

    eventTextTop.appendChild(eventTitle)
    eventTextTop.appendChild(eventDate)
    
    secondText.appendChild(eventLocation)
    secondText.appendChild(eventHost)

    thirdText.appendChild(eventDescription)

    eventTextBottom.appendChild(eventType)
    eventTextBottom.appendChild(counterWrapper)
    eventTextBottom.appendChild(counterWrapper2)

    eventTextWrapper.appendChild(eventTextTop)
    eventTextWrapper.appendChild(secondText)
    eventTextWrapper.appendChild(thirdText)
    eventTextWrapper.appendChild(eventTextBottom)

    a.appendChild(eventImageWrapper)
    a.appendChild(eventTextWrapper)

    eventSpacing.appendChild(a)

    return eventSpacing
}

const loadEvents = async () => {
    const response = await fetch("/events/all")

    if (response.status == 200) {
        const events = await response.json();
        console.log (events)
        for(let i = 0; i < events.length; i++){
            const elem = populateEvents(events[i])
            eventStrip.appendChild(elem)
        }
    } else {
        console.log("Hello")
    }
}

const populateSuggestions = (item) => {

    console.log(item)

    const { title, date_posted, location, description, type, host } = item

    let tempDate = new Date(date_posted);

    const suggestionSpacing = document.createElement("div")
    suggestionSpacing.classList.add("card")
    suggestionSpacing.classList.add("card-spacing")

    const a = document.createElement("a")
    a.classList.add("card-link")
    a.href = "#"

    const suggestionImageWrapper = document.createElement("div")
    suggestionImageWrapper.classList.add("card-image-wrapper")

    const suggestionImage = document.createElement("img")
    suggestionImage.src = "./res/recycle-image.png"

    const suggestionTextWrapper = document.createElement("div")
    suggestionTextWrapper.classList.add("card-text-wrapper")

    const suggestionTextTop = document.createElement("div")
    suggestionTextTop.classList.add("card-text-top")
    suggestionTextTop.classList.add("card-text-flex")
    suggestionTextTop.classList.add("card-text-padder")

    const suggestionTitle = document.createElement("div")
    suggestionTitle.classList.add("card-title")
    suggestionTitle.classList.add("card-text")
    suggestionTitle.textContent = title

    const suggestionDate = document.createElement("div")
    suggestionDate.classList.add("card-date")
    suggestionDate.classList.add("card-text")
    suggestionDate.classList.add("push-right")
    suggestionDate.textContent = tempDate.getDay() + "/" + tempDate.getMonth() + "/" + tempDate.getFullYear()

    const secondText = document.createElement("div")
    secondText.classList.add("card-text-second")
    secondText.classList.add("card-text-flex")
    secondText.classList.add("card-text-padder")

    const suggestionLocation = document.createElement("div")
    suggestionLocation.classList.add("card-location")
    suggestionLocation.classList.add("card-text")
    suggestionLocation.textContent = location

    const suggestionHost = document.createElement("div")
    suggestionHost.classList.add("card-host")
    suggestionHost.classList.add("card-text")
    suggestionHost.classList.add("push-right")
    suggestionHost.textContent = host

    const thirdText = document.createElement("div")
    thirdText.classList.add("card-text-third")
    thirdText.classList.add("card-text-flex")
    thirdText.classList.add("card-text-padder")

    const suggestionDescription = document.createElement("p")
    suggestionDescription.classList.add("card-description")
    suggestionDescription.classList.add("card-text")
    suggestionDescription.textContent = description

    const suggestionTextBottom = document.createElement("div")
    suggestionTextBottom.classList.add("card-text-bottom")
    suggestionTextBottom.classList.add("card-text-flex")
    suggestionTextBottom.classList.add("card-text-padder")
    suggestionTextBottom.classList.add("push-bottom")

    const suggestionType = document.createElement("h2")
    suggestionType.classList.add("card-type")
    suggestionType.classList.add("card-text")
    suggestionType.textContent = type

    const counterWrapper3 = document.createElement("div")
    counterWrapper3.classList.add("counter-wrapper")
    counterWrapper3.classList.add("push-right")
    counterWrapper3.innerHTML = `<svg class="comment-image counter-image" width="35" height="31" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="34" height="25" rx="2" fill="#D9D9D9"/>
    <path d="M31.1483 28.8355L25.6347 24.99L30.9721 22.1157L31.1483 28.8355Z" fill="#D9D9D9"/>
    <path d="M7 6H27V9H7V6Z" fill="white"/>
    <rect x="7" y="11" width="20" height="3" fill="white"/>
    <rect x="7" y="16" width="20" height="3" fill="white"/>
</svg>
<p class="card-comment-counter card-text card-counter">0</p>`

    const svg1 = document.createElement("svg")
    svg1.classList.add("comment-image")
    svg1.classList.add("counter-image")

    const suggestionCommentCounter = document.createElement("p")
    suggestionCommentCounter.classList.add("card-comment-counter")
    suggestionCommentCounter.classList.add("card-text")
    suggestionCommentCounter.classList.add("card-counter")

    const counterWrapper4 = document.createElement("div")
    counterWrapper4.classList.add("counter-wrapper")
    counterWrapper4.innerHTML=`<svg class="vote-image counter-image" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="vote-image-path" d="M0 11.0814L7 18L22 3L19 0L7 12L3 8L0 11.0814Z" fill="#4EB41F"/>
</svg>
<p class="card-volunteer-counter card-text card-counter">0</p>`

    const svg2 = document.createElement("svg")
    svg2.classList.add("volunteer-image")
    svg2.classList.add("counter-image")

    const suggestionVolunteerCounter = document.createElement("p")
    suggestionVolunteerCounter.classList.add("card-volunteer-counter")
    suggestionVolunteerCounter.classList.add("card-text")
    suggestionVolunteerCounter.classList.add("card-counter")

    suggestionImageWrapper.appendChild(suggestionImage)

    suggestionTextTop.appendChild(suggestionTitle)
    suggestionTextTop.appendChild(suggestionDate)
    
    secondText.appendChild(suggestionLocation)
    secondText.appendChild(suggestionHost)

    thirdText.appendChild(suggestionDescription)

    suggestionTextBottom.appendChild(suggestionType)
    suggestionTextBottom.appendChild(counterWrapper3)
    suggestionTextBottom.appendChild(counterWrapper4)

    suggestionTextWrapper.appendChild(suggestionTextTop)
    suggestionTextWrapper.appendChild(secondText)
    suggestionTextWrapper.appendChild(thirdText)
    suggestionTextWrapper.appendChild(suggestionTextBottom)

    a.appendChild(suggestionImageWrapper)
    a.appendChild(suggestionTextWrapper)
    
    suggestionSpacing.appendChild(a)
    return suggestionSpacing

}

carouselLeftButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (currentSlide > 0) {
        carouselButtons.querySelectorAll('.carousel-circle-button')[currentSlide-1].click();
    }
});

const loadSuggestions = async () => {
    const response = await fetch("/suggestions/all")

    if (response.status == 200) {
        const suggestions = await response.json();
        console.log (suggestions)
        for(let i = 0; i < suggestions.length; i++){
            const elem = populateSuggestions(suggestions[i])
            console.log(elem)
            suggestionStrip.appendChild(elem)
        }
    } else {
        console.log("Hello")
    }
}

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
    loadNews();
    loadEvents();
    loadSuggestions();
    
}

init();