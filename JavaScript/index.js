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
      console.log(data);

      const cityName = document.querySelector('.cityName');

      let city = data.location.name;
      let regiao = data.location.region;
      let pais = data.location.country;
      let temperature = data.current.temp_c;
      cityName.innerHTML = `${city} | ${regiao} | ${pais} | ${temperature}°C`;


      const daysOfTheWeek = document.querySelectorAll('.DayOfWeek');
      const condicao = document.querySelectorAll('.condicao');
      const condicaoIcones = document.querySelectorAll('.climaIcone');

      // data.forecast.forecastday.forEach((day) => {
      //    console.log(day)
      // })

      condicaoIcones.forEach((element) => {
         const icon = data.current.condition.icon;
         element.src = icon;
      });

      const condicaoAtual = data.current.condition.text;

      condicao.forEach((element) => {
         element.innerHTML = `${condicaoAtual}`;
      });

      const probabilidadeChuva = document.querySelectorAll('.probabilidadeChuva');
      const tempMax = document.querySelectorAll('.temperatureMax');
      const tempMin = document.querySelectorAll('.temperatureMin');
      

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

function updateWeather(inputCity){
   const city = inputCity;
   const apiKey = 'ea9e8fdb5f074392af0160830232705';
   const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=pt`

   fetch(apiUrl)
   .then((response) => response.json())
   .then((data) => {
      const temp = data.current.temp_c;
      const tempAtual = document.querySelectorAll('.temperaturaAtual');
      tempAtual.forEach((elemento) => {
         elemento.innerHTML = `${temp}°C`;
      })

   })
   .catch((error) => {
      console.log(`Ocorreu um erro na solicitação dos dados ${error}`);
   });
}


//AUTO COMPLETE SEARCH

/* let timeoutId; // Variável para armazenar o ID do timeout

const cityInput = document.querySelector('.cityInput');
cityInput.addEventListener('input', handleCityInput);

function handleCityInput(event) {
   const inputValue = event.target.value; // Valor digitado pelo usuário
   clearTimeout(timeoutId); // Limpar o timeout anterior
   timeoutId = setTimeout(() => {
      // Fazer a solicitação à API para obter as sugestões de autocompletar
      const apiKey = 'ea9e8fdb5f074392af0160830232705';
      const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${inputValue}&lang=pt`

      fetch(apiUrl)
         .then(response => response.json())
         .then(data => {
            const suggestions = data.map(item => item.name);
            // Atualizar a interface com as sugestões de autocompletar
            updateAutocompleteSuggestions(suggestions);
         })
         .catch(error => {
            console.error('Ocorreu um erro na solicitação:', error);
         });
   }, 300); // Aguardar 300 milissegundos antes de fazer a solicitação
}

function updateAutocompleteSuggestions(suggestions) {
   const autocompleteList = document.querySelector('.sugestoes');
   autocompleteList.innerHTML = '';
   suggestions.forEach(suggestion => {
      const item = document.createElement('li');
      item.innerHTML = suggestion;

      item.addEventListener('click', () => {
         const inputCity = document.querySelector('.cityInput')
         // Ao clicar em uma sugestão, preencher o campo de entrada de texto com o valor selecionado
         inputCity.value = suggestion;
         // Fazer uma nova solicitação à API para obter os dados da cidade selecionada
         getWeather(suggestion);
         updateWeather(suggestion);
         // Limpar a lista de sugestões
         autocompleteList.innerHTML = '';
      });
      autocompleteList.appendChild(item);
   });
} */

const searchWeather = () => {
   const inputCity = document.querySelector('.cityInput').value;
   getWeather(inputCity);
   updateWeather(inputCity);
}

searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   searchWeather();
});

