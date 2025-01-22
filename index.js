
const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".input");
const card = document.querySelector(".card");
const apiKey = "5f5a53b080d926fdc47d75b3c7e257c7";




weatherform.addEventListener("submit",async event =>{
    event.preventDefault();
    const city = cityinput.value;
    if(city){
        try {
            const wheatherdata = await getwheatherdata(city);
            displayWeatherdata(wheatherdata);
        } catch (error) {
            console.error(error);
            displayError(error)
        }
    }
    else{
        displayError("Please enter a city")
    }

})

async function getwheatherdata(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("could not fetch the wheather data")
    }
    return await response.json();
}

function displayWeatherdata(data){
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]} = data;

card.textContent = "";
card.style.display = "flex";
const citydisplay = document.createElement("h1");
const tempdisplay = document.createElement("p");
const humiditydisplay = document.createElement("p");
const descdisplay = document.createElement("p");
const weatheremoji = document.createElement("p");

citydisplay.textContent = city;
citydisplay.classList.add("CityDisplay");
card.appendChild(citydisplay);

tempdisplay.textContent = `${(temp-273.15).toFixed(1)}°c`;
tempdisplay.classList.add("CityDisplay");
card.appendChild(tempdisplay);

humiditydisplay.textContent = `Humidity:${humidity}`;
humiditydisplay.classList.add("humidDisplay");
card.appendChild(humiditydisplay);

descdisplay.textContent = description;
descdisplay.classList.add("descDisplay+");
card.appendChild(descdisplay);

weatheremoji.textContent =getwheatheremoji(id);
weatheremoji.classList.add("weatherEmoji");
card.appendChild(weatheremoji);
}
function getwheatheremoji(weatherid){
switch(true){
    case(weatherid >= 200 && weatherid <300):
    return "⛈️"; 
     
    case(weatherid >= 300 && weatherid <400):
    return "🌧️";  

    case(weatherid >= 500 && weatherid <600):
    return "🌧️"; 

    case(weatherid >= 600 && weatherid <700):
    return "❄️☃️"; 

    case(weatherid >= 700 && weatherid <800):
    return "🌫️"; 

    case(weatherid === 800):
    return "☀️"; 

    case(weatherid >= 801 && weatherid <810):
    return "🌤️"; 

    default :
    return "❓";
}
}





 function displayError(message){
const errordisplay = document.createElement("p");
errordisplay.textContent = message;
errordisplay.classList.add(".errorDisplay");
card.textContent = "";
card.style.display ="flex";
card.appendChild(errordisplay);
}





