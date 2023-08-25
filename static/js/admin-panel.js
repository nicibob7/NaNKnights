const firstButtons = document.querySelectorAll('.first-button');
const secondButtons = document.querySelectorAll('.second-button');
const sidebarButtons = document.querySelectorAll('.side-bar-button');
const sideBarNewsList = document.querySelector('#side-bar-news-list');
const sideBarEventsList = document.querySelector('#side-bar-events-list');
const sideBarSuggestionsList = document.querySelector('#side-bar-suggestions-list');
const sideBar = document.querySelector('#side-bar');

const addContentButton = document.querySelector('#add-content-button');
const topBarAddWrapper = document.querySelector('#top-bar-add-wrapper');

const homePanel = document.querySelector('#admin-panel-home');
const newsTop10Panel = document.querySelector('#admin-panel-news-top-10');
const eventsTop10Panel = document.querySelector('#admin-panel-events-top-10');
const suggestionsTop10Panel = document.querySelector('#admin-panel-suggestions-top-10');
const pendingPanel = document.querySelector('#admin-panel-pending');

const addNewsButton = document.querySelector('#add-news-button');
const addEventButton = document.querySelector('#add-event-button');
const addSuggestionButton = document.querySelector('#add-suggestion-button');

const addNewsForm = document.querySelector('#add-news-form');
const updateNewsForm = document.querySelector('#update-news-form');
const addEventForm = document.querySelector('#add-event-form');
const updateEventForm = document.querySelector('#update-event-form');
const addSuggestionForm = document.querySelector('#add-suggestion-form');
const updateSuggestionForm = document.querySelector('#update-suggestion-form');
const deleteFormDialog = document.querySelector('#delete-form-dialog');

const adminPanels = document.querySelectorAll('.admin-panel-container');
const overlayForms = document.querySelectorAll('.overlay-form');
const formCloseButtons = document.querySelectorAll('.form-close-button');
const overlay = document.querySelector('#overlay');

const deleteFormButton = document.querySelector('#delete-form-button');
const modifyButtonsTemplate = document.querySelector('#modify-buttons-template');
const pendingAlertButton = document.querySelector('#pending-alert-button');

let selectedId = -1;

const alertPending = async () => {
    let options = {
        headers: {
          "Authorization": "application/json"
        }
    }

    await fetch('http://localhost:3000/pending', options)
    .then((response) => response.json())
    .then((data) => {
        if (data.length > 0) {
            pendingAlertButton.classList.remove('hide');
        }
        else {
            pendingAlertButton.classList.add('hide');
        }
    });
}


const deselectTabs = () => {
    let tabSelected = sideBar.querySelectorAll('.tab-selected');
    for (let i = 0; i < tabSelected.length; i++) {
        tabSelected[i].classList.remove('tab-selected');
        // console.log(tabSelected[i]);
        if (tabSelected[i].classList.contains('first-button-selected')) {
            tabSelected[i].classList.remove('first-button-selected');
        }
        else if (tabSelected[i].classList.contains('second-button-selected')) {
            tabSelected[i].classList.remove('second-button-selected')
        }
    }
}

const hideScreens = () => {
    for (let i = 0; i < overlayForms.length; i++) {
        overlayForms[i].classList.add('hide');
    }
    overlay.classList.add('hide');
}

const hidePanels = () => {
    for (let i = 0; i < adminPanels.length; i++) {
        adminPanels[i].classList.add('hide');
    }
}

const generatePendingTable = (data) => {
    // console.log(data.length);
    if (data.length == 0) return;
    const headerLength = Object.keys(data[0]).length;
    // console.log(modifyButtonsTemplate);

    const table = document.createElement('table');
    table.classList.add('data-table');

    const trHeader = document.createElement('tr');
    for (let i = 0; i < headerLength; i++) {
        let header = document.createElement('th');
        // header.textContent = String(Object.keys(data)[i]);
        header.textContent = String(Object.keys(data[0])[i]);
        trHeader.appendChild(header);
    }

    let approveButtonHeader = document.createElement('th');
    approveButtonHeader.textContent = "Pending"
    trHeader.appendChild(approveButtonHeader);

    table.appendChild(trHeader);

    // console.log('stopping');
    // console.log(data.length);
    for (let i = 0; i < data.length; i++) {
        let panel = null;
        let approveButtons = modifyButtonsTemplate.content.querySelector('.approve-buttons-wrapper').cloneNode(true);
        // modifyButtons = modifyButtons.content.querySelector('.card-modify-buttons-wrapper');

        for (let i = 0; i < adminPanels.length; i++) {
            if (!adminPanels[i].classList.contains('hide')) {
                panel = adminPanels[i];
                break;
            }
        }

        let tableRow = document.createElement('tr');
        switch (panel.id) {
            case "admin-panel-home":
                tableRow.id = "news-" + data[i]['id'];
            break;
            case "admin-panel-news-top-10":
                tableRow.id = "news-" + data[i]['id'];
            break;
            case "admin-panel-event-top-10":
                tableRow.id = "event-" + data[i]['id'];
            break;
            case "admin-panel-suggestion-top-10":
                tableRow.id = "suggestion-" + data[i]['id'];
            break;
            case "admin-panel-pending":
                tableRow.id = "pending-" + data[i]['id'];
            break;
            case "admin-panel-server-logs":

            break;
        }

        approveButtons.querySelector('.accept-button').addEventListener('click', (e) => {
            e.preventDefault();

            const strArray = String(e.target.closest('tr').id).split('-');

            selectedId = parseInt(strArray[1]);

            // Approve Stuff
        });

        approveButtons.querySelector('.reject-button').addEventListener('click', (e) => {
            e.preventDefault();

            const strArray = String(e.target.closest('tr').id).split('-');

            selectedId = parseInt(strArray[1]);

            // Reject Stuff

        });

        for (let j = 0; j < headerLength; j++) {
            // console.log(headerLength);
            let td1 = document.createElement('td');

            let key = String(Object.keys(data[i])[j]);

            // console.log(data[i][key]);

            td1.textContent = String(data[i][key]);
            tableRow.appendChild(td1);
        }
        let td2 = document.createElement('td');
        td2.classList.add('fill-cell');
        // console.log(modifyButtons);
        td2.appendChild(approveButtons);
        tableRow.appendChild(td2);
        table.appendChild(tableRow);
    }

    for (let i = 0; i < adminPanels.length; i++) {
        if (!adminPanels[i].classList.contains('hide')) {
            adminPanels[i].querySelector('.data-table-container').textContent = "";
            adminPanels[i].querySelector('.data-table-container').appendChild(table);
        }
    }
}

const generateTables = (data) => {
    // console.log(data.length);
    if (data.length == 0) return;
    const headerLength = Object.keys(data[0]).length;
    // console.log(modifyButtonsTemplate);

    const table = document.createElement('table');
    table.classList.add('data-table');

    const trHeader = document.createElement('tr');


    for (let i = 0; i < headerLength; i++) {
        let header = document.createElement('th');
        // header.textContent = String(Object.keys(data)[i]);
        header.textContent = String(Object.keys(data[0])[i]);
        trHeader.appendChild(header);
    }

    let modifyButtonHeader = document.createElement('th');
    trHeader.appendChild(modifyButtonHeader);

    table.appendChild(trHeader);

    // console.log('stopping');
    // console.log(data.length);
    for (let i = 0; i < data.length; i++) {
        let panel = null;
        let modifyButtons = modifyButtonsTemplate.content.querySelector('.card-modify-buttons-wrapper').cloneNode(true);
        // modifyButtons = modifyButtons.content.querySelector('.card-modify-buttons-wrapper');

        for (let i = 0; i < adminPanels.length; i++) {
            if (!adminPanels[i].classList.contains('hide')) {
                panel = adminPanels[i];
                break;
            }
        }

        let tableRow = document.createElement('tr');
        switch (panel.id) {
            case "admin-panel-home":
                tableRow.id = "news-" + data[i]['id'];
            break;
            case "admin-panel-news-top-10":
                tableRow.id = "news-" + data[i]['id'];
            break;
            case "admin-panel-events-top-10":
                tableRow.id = "event-" + data[i]['id'];
            break;
            case "admin-panel-suggestions-top-10":
                tableRow.id = "suggestion-" + data[i]['id'];
            break;
            case "admin-panel-pending":
                tableRow.id = "news-" + data[i]['id'];
            break;
            case "admin-panel-server-logs":

            break;
        }

        modifyButtons.querySelector('.card-edit-button').addEventListener('click', (e) => {
            e.preventDefault();

            const strArray = String(e.target.closest('tr').id).split('-');

            selectedId = parseInt(strArray[1]);

            switch(strArray[0]) {
                case "news":
                    updateNewsForm.classList.remove('hide');
                break;
                case "event":
                    updateEventForm.classList.remove('hide');
                break;
                case "suggestion":
                    updateSuggestionForm.classList.remove('hide');
                break;
            }
            overlay.classList.remove('hide');
        });

        modifyButtons.querySelector('.card-delete-button').addEventListener('click', (e) => {
            e.preventDefault();

            const strArray = String(e.target.closest('tr').id).split('-');

            selectedId = parseInt(strArray[1]);

            switch(strArray[0]) {
                case "news":
                    // delete news function
                    e.target.closest('tr').remove();
                break;
                case "event":
                    // delete event function
                    e.target.closest('tr').remove();
                break;
                case "suggestion":
                    // delete suggestion function
                    e.target.closest('tr').remove();
                break;
            }

            // overlay.classList.remove('hide');
        });

        for (let j = 0; j < headerLength; j++) {
            // console.log(headerLength);
            let td1 = document.createElement('td');

            let key = String(Object.keys(data[i])[j]);

            // console.log(data[i][key]);

            td1.textContent = String(data[i][key]);
            tableRow.appendChild(td1);
        }
        let td2 = document.createElement('td');
        td2.classList.add('fill-cell');
        // console.log(modifyButtons);
        td2.appendChild(modifyButtons);
        tableRow.appendChild(td2);
        table.appendChild(tableRow);
    }

    for (let i = 0; i < adminPanels.length; i++) {
        if (!adminPanels[i].classList.contains('hide')) {
            adminPanels[i].querySelector('.data-table-container').textContent = "";
            adminPanels[i].querySelector('.data-table-container').appendChild(table);
        }
    }
}

addNewsForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

updateNewsForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

updateEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

addSuggestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
updateSuggestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

deleteFormButton.addEventListener('click', (e) => {
    e.preventDefault();

});

const init = () => {
    for (let i = 0; i < firstButtons.length; i++) {
        firstButtons[i].addEventListener('click', (e) => {
            e.preventDefault();


            if (firstButtons[i].id == 'side-bar-news') {
                if (sideBarNewsList.classList.contains('side-bar-list-expanded')) {
                    sideBarNewsList.classList.remove('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.remove('tab-selected-path');
                }
                else {
                    sideBarNewsList.classList.add('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.add('tab-selected-path');
                }
            }
            else if (firstButtons[i].id == 'side-bar-events') {
                if (sideBarEventsList.classList.contains('side-bar-list-expanded')) {
                    sideBarEventsList.classList.remove('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.remove('tab-selected-path');
                }
                else {
                    sideBarEventsList.classList.add('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.add('tab-selected-path');
                }
            }
            else if (firstButtons[i].id == 'side-bar-suggestions') {
                if (sideBarSuggestionsList.classList.contains('side-bar-list-expanded')) {
                    sideBarSuggestionsList.classList.remove('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.remove('tab-selected-path');
                }
                else {
                    sideBarSuggestionsList.classList.add('side-bar-list-expanded');
                    firstButtons[i].querySelector('.tab-path').classList.add('tab-selected-path');
                }
            }
            else {
                deselectTabs();
                firstButtons[i].classList.add('tab-selected');
                firstButtons[i].classList.add('first-button-selected');
            }

        });
    }

    for (let i = 0; i < secondButtons.length; i++) {
        secondButtons[i].addEventListener('click', (e) => {
            e.preventDefault();

            deselectTabs();

            secondButtons[i].classList.add('tab-selected');
            secondButtons[i].classList.add('second-button-selected');
        });
    }

    for (let i = 0; i < formCloseButtons.length; i++) {
        formCloseButtons[i].addEventListener('click', (e) => {
            e.preventDefault();

            formCloseButtons[i].closest('.overlay-form').classList.add('hide');
            overlay.classList.add('hide');
        });
    }

    for (let i = 0; i < sidebarButtons.length; i++) {
        sidebarButtons[i].addEventListener('click', () => {


            switch(sidebarButtons[i].id) {
                case "side-bar-home":
                    hidePanels();
                    homePanel.classList.remove('hide');
                break;
                case "side-bar-news-top-10":
                    hidePanels();
                    newsTop10Panel.classList.remove('hide');

                    let newsTable = document.querySelector('#news_table');

                    // get data
                    fetch("/news/all", { method: "GET" })
                        .then((response) => response.json())
                        .then((data) => {
                            // add data to table
                            generateTables(data);
                        }).catch((error) => console.log(error));
                break;
                case "side-bar-events-top-10":
                    hidePanels();
                    eventsTop10Panel.classList.remove('hide');
                    let eventsTable = document.querySelector('#events_table');

                    // get data
                    fetch("/events/all", { method: "GET" })
                        .then((response) => response.json())
                        .then((data) => {
                            // add data to table
                            generateTables(data);
                        }).catch((error) => console.log(error));
                break;
                case "side-bar-suggestions-top-10":
                    hidePanels();
                    suggestionsTop10Panel.classList.remove('hide');
                    let suggestionTable = document.querySelector('#sugestion_table');

                    // get data
                    fetch("/suggestions/all", { method: "GET" })
                        .then((response) => response.json())
                        .then((data) => {
                            // add data to table
                            generateTables(data);
                        }).catch((error) => console.log(error));
                break;
                case "side-bar-pending":
                    hidePanels();
                    pendingPanel.classList.remove('hide');
                    let pendingTable = document.querySelector('#pending_table');

                    // get data
                    fetch("/admins/pending/all", { method: "GET" })
                        .then((response) => response.json())
                        .then((data) => {
                            // add data to table
                            generateTables(data);
                        }).catch((error) => console.log(error));
                break;
            }

        });
    }

    addNewsButton.addEventListener('click', (e) => {
        e.preventDefault();

        addNewsForm.classList.remove('hide');
        overlay.classList.remove('hide');
    });

    addEventButton.addEventListener('click', (e) => {
        e.preventDefault();

        addEventForm.classList.remove('hide');
        overlay.classList.remove('hide');
    });

    addSuggestionButton.addEventListener('click', (e) => {
        e.preventDefault();

        addSuggestionForm.classList.remove('hide');
        overlay.classList.remove('hide');
    });

    addContentButton.addEventListener('click', (e) => {
        if (topBarAddWrapper.classList.contains('add-wrapper-expanded')) {
            topBarAddWrapper.classList.remove('add-wrapper-expanded');
        }
        else {
            topBarAddWrapper.classList.add('add-wrapper-expanded');
        }
    });
}

const getServerStats = async () => {
    return fetch("/admins/health", { method: "POST" })
        .then((response) => response.json())
        .then((response) => {
            if (response.status === 403) {
                return window.location.assign('/');
            }
            return response;
        })
        .catch(() => window.location.assign('/'));
}

const loadStatsGauges = () => {
    fetch("/admins/health", { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
            google.charts.load('current', {'packages':['gauge']});
            google.charts.setOnLoadCallback(() => {
                let stats = data.data;
                let chartData = google.visualization.arrayToDataTable(stats);

                // set so that values go up and down from value - 10 to value + 10 based on the stats
                let options = {
                    width: 600, height: 300,
                    redFrom: 85, redTo: 100,
                    yellowFrom: 70, yellowTo: 85,
                    greenFrom: 10, greenTo: 70,
                    minorTicks: 15
                };

                let chart = new google.visualization.Gauge(document.getElementById('server_stats'));
                chart.draw(chartData, options);

                setInterval(async function () {
                    const stats = await getServerStats();

                    chartData.setValue(0, 1, stats.data[1][1]);
                    chartData.setValue(1, 1, stats.data[2][1]);
                    chartData.setValue(2, 1, stats.data[3][1]);
                    chart.draw(chartData, options);
                }, 500);
            });

        }).catch((error) => console.log(error));
};

// get data and load charts
document.addEventListener('DOMContentLoaded', () => {
    loadStatsGauges();
});

init();

// set admin username
fetch("/account_type", { method: "POST" })
.then((response) =>  response.json())
.then((data) => {
    if (data.status === 403) {
        window.location.assign('/');
        return;
    }
    document.querySelector('#welcome-admin-name').textContent = data.account.username
})
.catch(() => window.location.assign('/'));



