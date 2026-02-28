import { API_KEY } from "./config.js";
let url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`;

const container = document.createElement('div');
document.body.appendChild(container);

async function getWeather(city){
    try {
        const response = await fetch(`${url+city}`);
        const data = await response.json();
        const resultWeather = document.querySelector('div');
        resultWeather.classList = "weather";
        resultWeather.classList.remove("show");
        void resultWeather.offsetWidth;
        resultWeather.classList.add("show");

        const name = data.location?.name ?? "Desconocido";
        const country = data.location?.country ?? "N/A";
        const temp_c = data.current?.temp_c ?? "N/A";
        const humidity = data.current?.humidity ?? "N/A";

        let text = "Sin datos";
        let icon = "";
        if (data.current?.condition) {
            text = data.current.condition.text;
            icon = `https:${data.current.condition.icon}`;
        }

        resultWeather.innerHTML = `
            <h2>${name}, ${country}</h2>
            <p>🌡️ Temperatura: ${temp_c}°C</p>
            <p>💧 Humedad: ${humidity}%</p>
            <p class="text">${text}</p>
            ${icon ? `<img class="icon" src="${icon}" alt="${text}">` : ""}
        `;

    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const city = document.getElementById('city').value.trim();
    container.innerHTML = "";
   
    if (city){
        getWeather(city);
    }

})