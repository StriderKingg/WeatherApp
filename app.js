window.addEventListener('load', () => {
  let lon;
  let lat;
  const locationEL = document.getElementById('infos-location');
  const timeEL = document.getElementById('infos-time');
  const degreeEL = document.getElementById('temperature-degree');
  const infoEL = document.getElementById('temperature-info');
  const sunriseEL = document.getElementById('sunInfo-container-sunrise');
  const sunsetEL = document.getElementById('sunInfo-container-sunset');
  const feltEL = document.getElementById('additional-felt');
  const windEL = document.getElementById('additional-wind');
  const humEL = document.getElementById('additional-hum');
  const oneDaysMaxEL = document.getElementById('oneDaysMax');
  const oneDaysMinEL = document.getElementById('oneDaysMin');
  const oneDaysDateEL = document.getElementById('oneDayDate');
  const twoDaysMaxEL = document.getElementById('twoDaysMax');
  const twoDaysMinEL = document.getElementById('twoDaysMin');
  const twoDaysDateEL = document.getElementById('twoDayDate');
  const threeDaysMaxEL = document.getElementById('threeDaysMax');
  const threeDaysMinEL = document.getElementById('threeDaysMin');
  const threeDaysDateEL = document.getElementById('threeDayDate');


  const today = new Date();
  const h = today.getHours();
  const m = (today.getMinutes()<10?'0':'') + today.getMinutes();
  const todaysDate = today.getDay();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=9f92587ff09c4bb2a257074cdceeb176`
      const api2 = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=9f92587ff09c4bb2a257074cdceeb176`
      fetch(api)
      .then(response => {
        return response.json()
      })
      .then(data => {
        const weatherInfo = data.data[0]
        const icon = weatherInfo.weather.icon;
        const temp = weatherInfo.temp;
        const info = weatherInfo.weather.description;
        const location = weatherInfo.city_name;
        const sunrise = weatherInfo.sunrise;
        const sunset = weatherInfo.sunset;
        const felt = weatherInfo.app_temp;
        const windDirection = weatherInfo.wind_cdir;
        const wind = (weatherInfo.wind_spd) * 10;
        const hum = weatherInfo.rh;

        // DOM Elements
        document.getElementById('weather-icon-img').src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
        locationEL.textContent = location;
        timeEL.textContent = `${weekdays[todaysDate]}, ${h}:${m}`
        degreeEL.textContent = temp + ' C°';
        infoEL.textContent = info;
        sunriseEL.textContent = sunrise;
        sunsetEL.textContent = sunset;
        feltEL.textContent = felt + ' C°';
        windEL.textContent = Math.floor(wind) + ' km/h ' + windDirection;
        humEL.textContent = Math.floor(hum) + "%";
      });

      fetch(api2)
      .then(response2 => {
        return response2.json()
      })
      .then(data2 => {
        // In 1 day
        const oneDay = data2.data[1];
        const oneDayMaxTemp = oneDay.max_temp;
        const oneDayMinTemp = oneDay.min_temp;
        const oneDayIcon = oneDay.weather.icon;
        // 1 Day DOM Elements
        document.getElementById('oneDayIcon').src = `https://www.weatherbit.io/static/img/icons/${oneDayIcon}.png`;
        oneDaysMaxEL.textContent = "High: " + Math.floor(oneDayMaxTemp);
        oneDaysMinEL.textContent = "Low: " + Math.floor(oneDayMinTemp);
        oneDaysDateEL.textContent = `${weekdays[todaysDate + 1]}`;
        // In 2 days
        const twoDay = data2.data[2];
        const twoDayMaxTemp = twoDay.max_temp;
        const twoDayMinTemp = twoDay.min_temp;
        const twoDayIcon = twoDay.weather.icon;
        // 2 Days DOM Elements
        document.getElementById('twoDayIcon').src = `https://www.weatherbit.io/static/img/icons/${twoDayIcon}.png`;
        twoDaysMaxEL.textContent = "High: " + Math.floor(twoDayMaxTemp);
        twoDaysMinEL.textContent = "Low: " + Math.floor(twoDayMinTemp);  
        twoDaysDateEL.textContent = `${weekdays[todaysDate + 2]}`;  
        // In 3 days
        const threeDay = data2.data[3];
        const threeDayMaxTemp = threeDay.max_temp;
        const threeDayMinTemp = threeDay.min_temp;
        const threeDayIcon = threeDay.weather.icon;
        // 3 Days DOM Elements
        document.getElementById('threeDayIcon').src = `https://www.weatherbit.io/static/img/icons/${threeDayIcon}.png`;
        threeDaysMaxEL.textContent = "High: " + Math.floor(threeDayMaxTemp);
        threeDaysMinEL.textContent = "Low: " + Math.floor(threeDayMinTemp); 
        threeDaysDateEL.textContent = `${weekdays[todaysDate + 3]}`;     
      });
    });
  };
});
