import { allWeatherData, currentTime, currentDate, API_KEY } from './app.js';

setInterval(() => {
    const time = new Date();

    // hour, min & 12hourformat
    const hourOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };

    // weekday, month, date & year
    const dayOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    const hours = time.toLocaleTimeString('en-US', hourOptions);
    const day = time.toLocaleDateString('en-US', dayOptions);

    currentTime.innerText = hours;
    currentDate.innerText = day;
}, 1000);

//getting succesful data fetching from api for current location
const success = async (position) => {
    let { latitude, longitude } = position.coords;
    console.log(position);

    // Current weather data API
    const geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    // One Call API
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    const weatherData = fetch(geoApiUrl).then((res) => res.json());
    const oneCallData = fetch(oneCallUrl).then((res) => res.json());

    const retriveAllData = (async function () {
        let results = await Promise.all([weatherData, oneCallData]);
        let weatherApiData = results[0];
        let oneCallApiData = results[1];

        allWeatherData(weatherApiData, oneCallApiData);
    })();
};

// error data
const error = () => {
    console.log('error message');
};

// get the current location of the user
const getCurrentLocation = () => {
    //get the current position from geolocation
    navigator.geolocation.getCurrentPosition(success, error);
};
getCurrentLocation();
