fetch('', {method: "POST"})
    .then(res => res.json())
    .then(data => {
        document.querySelector("#response").textContent = data.description + " posted by: " + data.posted_by + " at: "+ data.date_posted;
    })
    .catch(err => console.log(err));