const searchButton = document.querySelector('.searchButton');
searchButton.addEventListener('click', () => {
   searchWeather();
});

const searchWeather = () => {
   const inputCity = document.querySelector('.cityInput').value;
   getWeather(inputCity);
}

async function getWeather(inputCity){
   const city = inputCity;
   const apiKey = 'ea9e8fdb5f074392af0160830232705';
   const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`

   fetch(apiUrl)
   .then((response) => response.json())
   .then((data) => {
      console.log(data);
      const cityName = document.querySelector('.cityName');
      const cityNameCard = document.querySelector('.city-name');
      const city = data.location.name;
      const temperature = data.current.temp_c;
      cityName.innerHTML = `${city} | ${temperature}°C`;
      cityNameCard.innerHTML = `${city}`;

   })
   .catch((error) => {
      console.log(`Ocorreu um erro na solicitação dos dados ${error}`);
   });
}