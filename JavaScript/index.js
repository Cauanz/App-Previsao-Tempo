const searchButton = document.querySelector('.searchButton');

/* CACHE */
function storeCache(url, data, headers){
   const cacheEntry = {
      data: data,
      headers: {
         // ETag: headers.get('ETag'),
         // lastModified: headers.get('Last-Modified'),
         cacheControl: headers.get('Cache-Control'),
         // Expires: headers.get('Expires')
      },
      timeStamp: Date.now()
   };
   localStorage.setItem(url, JSON.stringify(cacheEntry));
}


/* RETORNO CONDIÇÃO ATUAL */
async function getWeather(inputCity){

   const city = inputCity;
   const apiKey = 'ea9e8fdb5f074392af0160830232705';
   /* PREVISÃO DO TEMPO - HOJE, AMANHÃ E DEPOIS DE AMANHÃ */
   const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&lang=pt`

   const cached = localStorage.getItem(forecastUrl);

   if(cached){
      const cacheEntry = JSON.parse(cached);
      const cacheControl = cacheEntry.headers.cacheControl;
      let maxAge = 0;
   

      if(cacheControl){
         const matches = cacheControl.match(/max-age=(\d+)/);
         
         if (matches && matches[1]) {
            maxAge = parseInt(matches[1], 10);
         }
      }
      const age = (Date.now() - cacheEntry.timeStamp) / 1000;

      if(age < maxAge){
         return cacheEntry.data;
      }
   }

   try {
      
      const response = await fetch(forecastUrl);
      const headers = response.headers;
      const data = await response.json();
      console.log(headers.get('Cache-Control'));

      return { headers, data, forecastUrl };
   } catch (error) {
      console.log(`Ocorreu um erro na função de aquisição dos dados ${error}`);
   }

}

// function updateWeather(inputCity){
//    const city = inputCity;
//    const apiKey = 'ea9e8fdb5f074392af0160830232705';
//    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=pt`

//    fetch(apiUrl)
//    .then((response) => response.json())
//    .then((data) => {
//       const temp = data.current.temp_c;
//       const tempAtual = document.querySelectorAll('.temperaturaAtual');
//       tempAtual.forEach((elemento) => {
//          elemento.innerHTML = `${temp}°C`;
//       })

//    })
//    .catch((error) => {
//       console.log(`Ocorreu um erro na solicitação dos dados ${error}`);
//    });
// }


const searchWeather = () => {
   const inputCity = document.querySelector('.cityInput').value;
   getWeather(inputCity)
   .then(({ headers, data, forecastUrl }) => {
      // console.log(data); //* DEBUG

      storeCache(forecastUrl, data, headers)

      const cityName = document.querySelector('.cityName');

      let city = data.location.name;
      let regiao = data.location.region;
      let pais = data.location.country;
      cityName.innerHTML = `${city} | ${regiao} | ${pais}`;

      const daysOfTheWeek = document.querySelectorAll('.DayOfWeek');
      const condicao = document.querySelectorAll('.condicao');
      const condicaoIcones = document.querySelectorAll('.climaIcone');
      const probabilidadeChuva = document.querySelectorAll('.probabilidadeChuva');
      const tempMax = document.querySelectorAll('.temperatureMax');
      const tempMin = document.querySelectorAll('.temperatureMin');
      const tempAtual = document.querySelector('#temperaturaAtual');

      const now = new Date().getTime();
      const hourData = data.forecast.forecastday[0].hour.find(hour => hour.time_epoch * 1000 >= now);
      if(hourData){
         const temp = hourData.temp_c;
         tempAtual.textContent = `${temp}°C`;
      }

      daysOfTheWeek.forEach((div, index) => {
         const WeekDays = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'];
         const timeStamp = data.forecast.forecastday[index].date;
         const day = new Date(timeStamp)
         const dayIndex = day.getDay();
         div.textContent = WeekDays[dayIndex];
      })
      
      condicaoIcones.forEach((element, index) => {
         const icon = data.forecast.forecastday[index].day.condition.icon;
         element.src = icon;
      });

      condicao.forEach((element, index) => {
         const condicaoAtual = data.forecast.forecastday[index].day.condition.text;
         element.innerHTML = condicaoAtual;
      });
      
      probabilidadeChuva.forEach((element, index) => {
      const forecastday = data.forecast.forecastday[index];
      if (forecastday) {
         const chuva = forecastday.day.daily_chance_of_rain;
         element.innerHTML = `Probabilidade de chuva: ${chuva}%`;
      }
      });
      
      tempMax.forEach((element, index) => {
      const forecastday = data.forecast.forecastday[index];
      if (forecastday) {
         const maxTemperature = forecastday.day.maxtemp_c;
         const maxTemp = element.querySelectorAll('.value');
         maxTemp.forEach((element) => {
            element.innerHTML = `${maxTemperature}°C`;
         });
      }
      });
      
      tempMin.forEach((element, index) => {
      const forecastday = data.forecast.forecastday[index];
      if (forecastday) {
         const minTemperature = forecastday.day.mintemp_c;
         const minTemp = element.querySelectorAll('.value');
         minTemp.forEach((element) => {
            element.innerHTML = `${minTemperature}°C`;
         });
      }
      });

   }).catch((error) => {
      console.log(`Ocorreu um erro na solicitação dos dados ${error}`);
   });
}

searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   searchWeather();
});

