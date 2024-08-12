//Application

const weather = document.querySelector(".weather");
const inputCity = document.querySelector(".inputCity");
const informationBox = document.querySelector(".informationBox");
const apiKey = "c0863612a49baa830f8b95bacc6e61f4";

weather.addEventListener("submit", async event => {

    // To prevent refreshing the page
    event.preventDefault();

    const city = inputCity.value;
    console.log(city);

    if(city){
        try{
            const weatherInfo = await getWeatherInfo(city);
            displayWeatherInfo(weatherInfo);     
        }catch(error){
            console.error(error);
            displayError(error);
        }
       
    } else {
        displayError("Re-Enter the city !");
    }
});

async function getWeatherInfo(city) {
    // Fetching weather data
    //temp string. used ` `sign. not '' this
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await fetch(apiUrl);

    console.log(response);

    if (!response.ok) {
        throw new Error("Couldn't fetch weather information");
    }

    return await response.json();
}

function displayWeatherInfo(info){
    //Object structuring
    const {name: city, 
            main: {temp}, 
            weather: [{description, id}] } = info;

    informationBox.textContent = "";
    informationBox.style.display = "flex";
    
    const yourCity = document.createElement("h1");
    const displayTemp = document.createElement("p");
    const weatherDescription = document.createElement("p");
    const imoji = document.createElement("p");

    yourCity.textContent = city;
    yourCity.classList.add("h1");
    informationBox.appendChild(yourCity);

    displayTemp.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    displayTemp.classList.add("temperature");
    informationBox.appendChild(displayTemp);

    weatherDescription.textContent = description;
    weatherDescription.classList.add("description");
    informationBox.appendChild(weatherDescription);

    imoji.textContent = displayWeatherImoji(id);
    //imoji.classList.add("stormy", "rainy", "snowy", "windy", "sunny", "cloudy");  
    imoji.classList.add("imoji");
    informationBox.appendChild(imoji);  

}

function displayWeatherImoji(weatherType){
    switch(true){
        case (weatherType >= 200 && weatherType < 300):
            return "⛈";
        case (weatherType >= 300 && weatherType < 500):
            return "🌧"; 
        case (weatherType >= 500 && weatherType < 600):
            return "🌧";
        case (weatherType >= 600 && weatherType < 700):
            return "❄";
        case (weatherType >= 700 && weatherType < 800):
            return "🌫";
        case (weatherType === 800):
            return "☀";    
        case (weatherType >= 801):
            return "☁";
        default:
            return "❓";
                                     
    }
}

function displayError(errorMessage){

    //Creating a paragraph element
    const errorParagraph = document.createElement("p");
    errorParagraph.textContent = errorMessage;
    errorParagraph.classList.add("error");

    informationBox.textContent = "";
    informationBox.style.display = "flex"
    //append the paragraph to the information box
    informationBox.appendChild(errorParagraph);
}
