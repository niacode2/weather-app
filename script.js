const { name } = data;
const { icon , description } = data.weather[0];
const { temp , humidity } = data.main;
const { speed } = data.wind;

let weather = {
    "apiKey": "ada689768f57ad05b8c8d9c50abfbe0b",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon , description } = data.weather[0];
        const { temp , humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".windspeed").innerText = "Windspeed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

    colorChange: function(data) {
        var tempColor= this.displayWeather(data.main.temp);
        console.log(data.main.temp);
        if(tempColor<=10){
            document.body.style.backgroundColor="lightgrey";
        }
        else if(tempColor>=11&&tempColor<20){
            document.body.style.backgroundColor="lightblue";
        }
        else{
            document.body.style.backgroundColor="lightcoral";
        }
    }
}
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
    weather.colorChange();
})

document.querySelector(".search-bar").addEventListener("keyup", function(){
    if (event.key=="Enter"){
        weather.search();
        weather.colorChange();
    }
})

weather.fetchWeather("denver");
weather.colorChange();