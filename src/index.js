function formatDate() {
    let nowDate = new Date();
    let LocaleTime = nowDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    let date = nowDate.getDate();
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    let month = months[nowDate.getMonth()];
    let dayNames = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];
    let day = dayNames[nowDate.getDay()];
    let h3Main = document.querySelector(".h3-main-form");
    h3Main.innerHTML = `${LocaleTime}, ${date} ${month}, ${day} `;
}
formatDate();

const api  = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "261be960710adff4cf2620414d0a38ed"
}


function selectCity(event) {
    let searchInput = document.querySelector("#search-input");
    event.preventDefault();

    requestApi(searchInput.value)
   
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", selectCity);

let apiUrl;
function requestApi(query) {
    apiUrl = `${api.base}weather?q=${query}&APPID=${api.key}`;
    getResults();
}
function geolocation() {
    navigator.geolocation.getCurrentPosition(onSuccess)
}

let currentCity = document.querySelector("#currentCity");
currentCity.addEventListener("click", geolocation);

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    apiUrl = `${api.base}weather?lat=${latitude}&lon=${longitude}&APPID=${api.key}`;
    getResults();
}


function getResults() {
    fetch(apiUrl)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

let temps;
function displayResults(weather) {
    let city = document.querySelector("#cityChange");
    let cityHeader = document.querySelector("#city-header");
    city.innerHTML = `${weather.name}`;
    cityHeader.innerHTML = `${weather.name}`;

    let tempCel = `${Math.round(weather.main.temp - 273.15)}`;
    let tempFar = `${Math.round((weather.main.temp - 273.15) * 1.8 + 32)}`;

    let temp = document.querySelector('#temp-now');
    temp.innerHTML = tempCel;
    temps = { tempCel: tempCel, tempFar:tempFar }
    return temps;
}


console.log(temps);
function convertTempCel(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temp-now");
    temperature.innerHTML = temps.tempCel;
}

function convertTempFar(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temp-now");
    temperature.innerHTML = temps.tempFar;

}



let changeTempCel = document.querySelector("#celsiusDegree");
changeTempCel.addEventListener("click", convertTempCel);
let changeTempFar = document.querySelector("#fahrenheitDegree");
changeTempFar.addEventListener("click", convertTempFar);

