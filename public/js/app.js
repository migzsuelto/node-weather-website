const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")
const $sendLocationButton = document.querySelector("#send-location");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})

$sendLocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser.");
    }

    $sendLocationButton.setAttribute("disabled", "disabled");

    navigator.geolocation.getCurrentPosition(async position => {
        messageOne.textContent = "Loading...";
        messageTwo.textContent = '';
        const response = await fetch("/forecast?latitude=" + position.coords.latitude +"&longitude="+position.coords.longitude)
        $sendLocationButton.removeAttribute("disabled");
        const data = await response.json()

        if (data.error) {
            console.log(data.error);
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});