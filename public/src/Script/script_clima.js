document.addEventListener("DOMContentLoaded", function() {
    let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    let api_key = "6d51cd4aa4deb04d9eaa166f1616a848";
    let difKelvin = 273.15;

    // Lista de ciudades
    let cities = ['Rosario', 'Buenos Aires', 'Cordoba', 'Resistencia'];

    function getCurrentDate() {
        let currentDate = new Date();
        let day = String(currentDate.getDate()).padStart(2, '0');
        let month = String(currentDate.getMonth() + 1).padStart(2, '0');
        let year = currentDate.getFullYear();
        return `${day}-${month}-${year}`;
    }

    function fetchWeatherData(city) {
        let apiUrl = `${urlBase}?q=${city}&appid=${api_key}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateWeatherInfo(data, city);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function updateWeatherInfo(data, city) {
        let container = document.getElementById('container');
        let weatherInfoHTML = `
            <div class="container" id="${city}">
                <div class="weather-side">
                    <div class="weather-gradient">
                        <div class="date-container">
                            <h2 class="date-dayname">${getCurrentDayName()}</h2>
                            <span class="date-day">${getCurrentDate()}</span>
                            <ion-icon name="location-outline"></ion-icon>
                            <span class="location">${data.name}, ${data.sys.country}</span>
                            <h1 class="weather-temp">${Math.round(data.main.temp - difKelvin)}°C</h1>
                            <h3 class="max-temp">${Math.round(data.main.temp_max - difKelvin)}°C</h3>
                            <h3 class="min-temp">${Math.round(data.main.temp_min - difKelvin)}°C</h3>
                        </div>
                        <div class="weather-container">
                            <h3 class="humidity">Humedad: ${data.main.humidity}%</h3>
                            <h3 class="rain-probability">Prob. de lluvia: ${data.clouds.all}%</h3>
                            <h3 class="wind-speed">Viento: ${Math.round(data.wind.speed * 3.6)} km/h</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += weatherInfoHTML;
    }

    function buscarClima() {
        cities.forEach(city => {
            fetchWeatherData(city);
        });
    }

    function getCurrentDayName() {
        let days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[new Date().getDay()];
    }

    // Buscar clima automáticamente al cargar la página
    buscarClima();
});
