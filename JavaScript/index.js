const searchButton = document.querySelector('.searchButton');


/* RETORNO CONDIÇÃO ATUAL */
async function getWeather(inputCity){

   const city = inputCity;
   const apiKey = 'ea9e8fdb5f074392af0160830232705';
   // const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=pt`;

   // fetch(apiUrl)
   // .then((response) => response.json())
   // .then((data) => {
   //    console.log(data); // Teste de retorno de dados 

      // const cityName = document.querySelector('.cityName');

      // let city = data.location.name;
      // let regiao = data.location.region;
      // let pais = data.location.country;
      // let temperature = data.current.temp_c;
      // cityName.innerHTML = `${city} | ${regiao} | ${pais} | ${temperature}°C`;


      // const condicao = document.querySelectorAll('.condicao');
      // const condicaoIcones = document.querySelectorAll('.climaIcone');

      // condicaoIcones.forEach((element) => {
      //    const icon = data.current.condition.icon;
      //    element.src = icon;
      // });


      // const condicaoAtual = data.current.condition.text;

      // condicao.forEach((element) => {
      //    element.innerHTML = `${condicaoAtual}`;
      // });

   // })
   // .catch((error) => {
   //    console.log(`Ocorreu um erro na solicitação dos dados ${error}`);
   // });


   /* PREVISÃO DO TEMPO - HOJE, AMANHÃ E DEPOIS DE AMANHÃ */

   /* FUNÇÃO AUTO INVOCADA - SÓ PARA FECHAR NO EDITOR */
   const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&lang=pt`

   fetch(forecastUrl)
   .then((response) => response.json())
   .then((data) => {
      // console.log(data); //* DEBUG

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
   getWeather(inputCity);
}

searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   searchWeather();
});

