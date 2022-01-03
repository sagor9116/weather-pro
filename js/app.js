const API_KEY = '6d5b688081cb599bd077f23cd96ce48f';

const wrapperBg = document.querySelector('.wrapper-bg');
const currentTime = document.getElementById('current-time');
const currentDate = document.getElementById('current-date');
const currentCity = document.getElementById('current-city');
const weatherIcon = document.querySelector('.current-weather-icon img');
const currentTemp = document.getElementById('current-temp');
const currentSky = document.getElementById('current-sky');
const currentTimezone = document.querySelector('.current-timezone');

const windSpeed = document.getElementById('wind');
const allClouds = document.getElementById('clouds');
const feelsLike = document.getElementById('feels-like');
const weatherVisibility = document.getElementById('visibility');
const weatherPressure = document.getElementById('pressure');
const dewPoint = document.getElementById('dew-point');
const dayTime = document.getElementById('day');
const nightTime = document.getElementById('night');
const sunriseTxt = document.getElementById('sunrise-txt');
const sunsetTxt = document.getElementById('sunset-txt');
const moonriseTxt = document.getElementById('moonrise-txt');
const moonsetTxt = document.getElementById('moonset-txt');

const humidityInfo = document.getElementById('humidity-txt');
const uviInfo = document.getElementById('uvi-txt');

const dailyData = document.getElementById('future-forecast');
const hourlyUpdatedData = document.querySelector('.hourly-updated-forecast');

const currentWeatherData = (weatherApiData) => {
    console.log(weatherApiData);
    // apiData object destructuring
    const { main, name, sys, weather } = weatherApiData;
    const { country } = sys;
    const { temp } = main;

    // apiData array destructuring
    const [weatherData] = weather;
    const { main: weatherMain } = weatherData;

    //getting the dayTime && nightTime
    const hours = new Date().getHours();
    console.log(hours);
    const isDayTime = hours >= 6 && hours < 20;
    console.log(isDayTime);

    // changing the background image according to the weather
    // switch (weatherMain) {
    //     case 'Clear':
    //         isDayTime
    //             ? (wrapperBg.style.backgroundImage =
    //                   "url('/images/day-clear.jpg')")
    //             : (wrapperBg.style.backgroundImage =
    //                   "url('/images/night-clear.jpg')");
    //         break;

    //     case 'Thunderstorm':
    //         wrapperBg.style.backgroundImage = "url('/images/thunderstorm.jpg')";
    //         break;

    //     case 'Drizzle':
    //         wrapperBg.style.backgroundImage = "url('/images/day-rain.jpg')";
    //         break;

    //     case 'Rain':
    //         isDayTime
    //             ? (wrapperBg.style.backgroundImage =
    //                   "url('/images/day-rain.jpg')")
    //             : (wrapperBg.style.backgroundImage =
    //                   "url('/images/night-rain.jpg')");
    //         break;

    //     case 'Snow':
    //         wrapperBg.style.backgroundImage = "url('/images/day-snow.jpg')";
    //         break;

    //     case 'Fog':
    //         wrapperBg.style.backgroundImage = "url('/images/fog.jpg')";
    //         break;

    //     case 'Clouds':
    //         isDayTime
    //             ? (wrapperBg.style.backgroundImage =
    //                   "url('/images/day-cloud.jpg')")
    //             : (wrapperBg.style.backgroundImage =
    //                   "url('/images/day-cloud.jpg')");
    //         break;

    //     default:
    //         break;
    // }

    // get the weather images according to the weather and time(day/night)
    if (weatherMain === 'Thunderstorm') {
        if (isDayTime) {
            weatherIcon.src = '/icons/svg/thunderstorms.svg';
        } else {
            weatherIcon.src = '/icons/svg/nt_chancetstorms.svg';
        }
    } else if (weatherMain === 'Drizzle') {
        if (isDayTime) {
            weatherIcon.src = '/icons/svg/flurries.svg';
        } else {
            weatherIcon.src = '/icons/svg/nt_flurries.svg';
        }
    } else if (weatherMain === 'Rain') {
        if (isDayTime) {
            weatherIcon.src = '/icons/svg/rain.svg';
        } else {
            weatherIcon.src = '/icons/svg/nt_rain.svg';
        }
    } else if (weatherMain === 'Snow') {
        if (isDayTime) {
            weatherIcon.src = '/icons/svg/snow.svg';
        } else {
            weatherIcon.src = '/icons/svg/nt_snow.svg';
        }
    } else if (weatherMain === 'Fog') {
        if (isDayTime) {
            weatherIcon.src = '/icons/svg/hazy.svg';
        } else {
            weatherIcon.src = '/icons/svg/nt_hazy.svg';
        }
    } else if (weatherMain === 'Clear') {
        if (isDayTime) {
            weatherIcon.src = '/icons/svg/clear.svg';
        } else {
            weatherIcon.src = '/icons/svg/nt_clear.svg';
        }
    } else if (weatherMain === 'Clouds') {
        if (isDayTime) {
            weatherIcon.src = '/icons/svg/cloudy.svg';
        } else {
            weatherIcon.src = '/icons/svg/nt_cloudy.svg';
        }
    } else {
        if (isDayTime) {
            weatherIcon.src = '/icons/svg/unknown.svg';
        } else {
            weatherIcon.src = '/icons/svg/nt_unknown.svg';
        }
    }

    // UI codes for current/default location
    currentCity.innerText = `${name}, ${country}`;
    currentTemp.innerHTML = `<p>${Math.floor(temp)}&deg;C</p>`;
    currentSky.innerText = `${weatherMain}`;
};

const dailyWeatherData = (oneCallApiData) => {
    // oneCallApiData object destructuring
    const { current, daily, hourly, timezone } = oneCallApiData;
    console.log(oneCallApiData);

    // timezone
    currentTimezone.innerText = `${timezone}`;

    // using current object data from oneCallApiData
    function objCurrent() {
        const {
            wind_speed,
            dew_point,
            visibility,
            pressure,
            clouds,
            feels_like,
        } = current;

        // converting data
        const convertedVisibility = visibility / 1000; // (1km = 1000m)
        const convertWindSpeed = Math.round(wind_speed * 3.6); // (1m/s = 3.6km/h)

        // UI code
        windSpeed.innerText = `${convertWindSpeed} mph`;
        allClouds.innerText = `${clouds}%`;
        feelsLike.innerHTML = `<p>${Math.round(feels_like)}&deg;C</p>`;
        weatherVisibility.innerText = `${Math.round(convertedVisibility)} Km`;
        weatherPressure.innerText = `${Math.round(pressure)} hPa`;
        dewPoint.innerHTML = `<p>${Math.round(dew_point)}&deg;C</p>`;
    }
    objCurrent();

    // using daily array's first item from oneCallApiData
    function arrayDailyFirst() {
        const dailyFirst = daily[0];
        const {
            temp,
            weather,
            sunrise,
            sunset,
            moonrise,
            moonset,
            humidity,
            uvi,
        } = dailyFirst;
        const { min, max } = temp;
        const { description, main } = weather[0];

        // hour, min & 12hourformat
        const hourOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        // converting data
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString(
            'en-US',
            hourOptions,
        );
        console.log(sunriseTime);

        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString(
            'en-US',
            hourOptions,
        );

        const moonriseTime = new Date(moonrise * 1000).toLocaleTimeString(
            'en-US',
            hourOptions,
        );
        const moonsetTime = new Date(moonset * 1000).toLocaleTimeString(
            'en-US',
            hourOptions,
        );

        dayTime.innerHTML = `<p id="day">Expect ${description}. High temp will be ${Math.round(
            max,
        )}&deg;C.`;
        nightTime.innerHTML = `<p id="day">Expect ${main}. Low temp will be ${Math.round(
            min,
        )}&deg;C.`;

        sunriseTxt.innerHTML = `<span id="sunrise-txt">${sunriseTime}</span>`;
        sunsetTxt.innerHTML = `<span id="sunset-txt">${sunsetTime}</span>`;
        moonriseTxt.innerHTML = `<span id="moonrise-txt">${moonriseTime}</span>`;
        moonsetTxt.innerHTML = `<span id="moonset-txt">${moonsetTime}</span>`;
        humidityInfo.innerText = `${humidity}%`;
        uviInfo.innerText = `${Math.round(uvi)}%`;
    }
    arrayDailyFirst();

    // using daily array from oneCallApiData
    function arrayDailyAll() {
        let everyDayForecast = '';

        daily.map((d) => {
            const { temp, weather, dt } = d;
            const { icon, description } = weather[0];

            // converting data
            const dtTime = new Date(dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
            });

            everyDayForecast += `
      <div class="weather-forecast-items">
                  <div>${dtTime}</div>
                   <img
                    src="http://openweathermap.org/img/wn/${icon}.png"
                    alt=""
                    class="daily-weather-icon"
                    id="daily-weather-icon"
                  />
                  <div>${Math.round(temp.day)}&deg;C</div>
                  <div> ${description}</div>
        </div>
        `;
        });

        dailyData.innerHTML = everyDayForecast;
    }
    arrayDailyAll();

    function arrayHourly() {
        let size = 6;
        const hourlyData = hourly.slice(0, size).map((hour) => {
            return hour;
        });

        let everyHourData = '';
        hourlyData.map((h) => {
            const { dt, temp, weather } = h;
            const { icon, main } = weather[0];

            // hour & 12hourformat
            const hourOptions = {
                hour: 'numeric',
                hour12: true,
            };

            // converting data
            const dtTime = new Date(dt * 1000).toLocaleTimeString(
                'en-US',
                hourOptions,
            );

            everyHourData += `
      <div class="hourly-forecast-items">
                  <div>${dtTime}</div>
                  <img src = "https://openweathermap.org/img/wn/${icon}.png" alt = "hourly weather icons"/>
                  <div>${Math.round(temp)}&deg;C</div>
                  <div>${main}</div>
        </div>
        `;
        });

        hourlyUpdatedData.innerHTML = everyHourData;
    }
    arrayHourly();
};

// call all the function
const allWeatherData = (weatherApiData, oneCallApiData) => {
    currentWeatherData(weatherApiData);
    dailyWeatherData(oneCallApiData);
};

export { allWeatherData, currentTime, currentDate, API_KEY };
