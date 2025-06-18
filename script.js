const api_key = '233f14fd73f1325aaea4859e064e9b05';
const submit = document.getElementById("submit");
const Inputname = document.getElementById("cityname");
const Result = document.getElementById("weather_result");
const error = document.getElementById("error");
const toggle = document.getElementById("toggle");
let currentUnit = "metric";
toggle.addEventListener("click",() =>
{
    currentUnit = currentUnit === "metric" ? "imperial" : "metric";
     toggle.textContent = `Switch to ${currentUnit === "metric" ? "°F" : "°C"}`;
     const city = Inputname.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});
submit.addEventListener("click",function(){
    const city = Inputname.value.trim();
    if(city === "")
    {
        error.textContent = "Enter the City name";
        return;
    }
  error.textContent = "";
    getWeather(city);
});

function getWeather(city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${currentUnit}`;
     fetch(apiUrl)
       .then(response =>{
            if(!response.ok)
                throw new Error("City not found");
            return response.json();
     })
     .then(data =>{
        document.getElementById("Cityoutput").textContent = data.name;
        document.getElementById("temperature").textContent=`Temperature : ${data.main.temp} ${currentUnit === "metric" ? "°C" :"°F"}`;
        document.getElementById("feelsLike").textContent =`FeelLike : ${data.main.feels_like} ${currentUnit === "metric" ? "°C" :"°F"}`;
        document.getElementById("humidity").textContent=`Humidity : ${data.main.humidity}%`;
        document.getElementById("windSpeed").textContent=`Wind Speed :${data.wind.speed} ${currentUnit === "metric" ? "m/s" : "mph"}`;
        const iconcode = data.weather[0].icon;
        const iconUrl =  `https://openweathermap.org/img/wn/${iconcode}@2x.png`;
        const iconimg = document.getElementById("icon");
        iconimg.src=iconUrl;
        iconimg.style.display = "block";
        const utcTime = data.dt; 
        const offset = data.timezone; 
        const localUnix = utcTime + offset; 
        const localDate = new Date(localUnix * 1000); 
        const formattedTime = localDate.toISOString().substr(11, 8);
        document.getElementById("time").textContent = `Local Time : ${formattedTime}`;
         Result.style.display = "block";



     })
     .catch(err=>{
        error.textContent = err.message;
        Result.style.display = "none";
     })
       
     
}
