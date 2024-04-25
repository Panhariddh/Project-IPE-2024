const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// This code adds an event listener to the 'click' event on the search button
search.addEventListener('click', () => {
    // API key for accessing weather data 
    const APIKey = 'api keyss';
    // Retrieve the value entered in the search input field
    const city = document.querySelector('.search-box input').value;

    // Check if the city value is empty
    if (city === '')
    // If city is empty, exit the function without further processing
        return;

    // Fetch weather data from OpenWeatherMap API using the city and API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            // Check if the API response indicates a '404' error (invalid city)
            if (json.cod === '404') {
                // Update UI to show a 404 error message
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return; // Exit the function if there's a 404 error
            }

            // If no 404 error, hide the 404 error message (if shown)
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

             // Update UI elements with weather data
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Update weather image based on weather conditions
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = ''; // Default image if no match
            }

            // Update temperature, description, humidity, and wind speed
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Show weather box and details, animate with fadeIn effect
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            // Adjust container height to accommodate weather display
            container.style.height = '590px';


        });


});