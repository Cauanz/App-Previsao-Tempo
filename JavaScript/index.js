const searchButton = document.querySelector('.searchButton');
searchButton.addEventListener('click', () => {
   searchWeather();
});

const searchWeather = () => {
   const inputCity = document.querySelector('.cityInput').value;
   getWeather(inputCity);
   updateWeather(inputCity);
}

async function getWeather(inputCity){
   /* RETORNO CONDIÇÃO ATUAL */
   const city = inputCity;
   const apiKey = 'ea9e8fdb5f074392af0160830232705';
   const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`

   fetch(apiUrl)
   .then((response) => response.json())
   .then((data) => {
      console.log(data);
      const cityName = document.querySelector('.cityName');
      const cityNameCard = document.querySelectorAll('.city-name');
      let city = data.location.name;
      let temperature = data.current.temp_c;
      cityName.innerHTML = `${city} | ${temperature}°C`;
      cityNameCard.forEach((element) => {
         element.innerHTML = `${city}`;
      });


      const condicao = document.querySelectorAll('.condicao');

      const condicaoAtual = data.current.condition.text;

      condicao.forEach((element) => {
         element.innerHTML = `${condicaoAtual}`;
      });

   })
   .catch((error) => {
      console.log(`Ocorreu um erro na solicitação dos dados ${error}`);
   });



   /* PREVISÃO DO TEMPO - FUTURO*/

   (function() { /* FUNÇÃO AUTO INVOCADA - SÓ PARA FECHAR NO EDITOR*/
      const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7`

      fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
   
         const probabilidadeChuva = document.querySelectorAll('.probabilidadeChuva');
         const tempMax = document.querySelectorAll('.temperatureMax');
         const tempMin = document.querySelectorAll('.temperatureMin');
         
   
         const maxTemperature = data.forecast.forecastday[0].day.maxtemp_c;
         const minTemperature = data.forecast.forecastday[0].day.mintemp_c;
         const chuva = data.forecast.forecastday[0].day.daily_chance_of_rain;
         
         probabilidadeChuva.forEach((element) => {
            element.innerHTML = `Probabilidade ${chuva}%`;
         });
   
         tempMax.forEach((element) => {
            const maxTemp = element.querySelectorAll('.value');
            
            maxTemp.forEach((element) => {
               element.innerHTML = `${maxTemperature}°C`;
               console.log(element);
            });
         });
   
         tempMin.forEach((element) => {
            const minTemp = element.querySelectorAll('.value');
   
            minTemp.forEach((element) => {
               element.innerHTML = `${minTemperature}°C`;
               console.log(element);
            });
         });
   
      }).catch((error) => {
         console.log(`Ocorreu um erro na solicitação dos dados ${error}`);
      });
   })();
}

function updateWeather(inputCity){
   const city = inputCity;
   const apiKey = 'ea9e8fdb5f074392af0160830232705';
   const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`

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

let timeoutId; // Variável para armazenar o ID do timeout

const cityInput = document.querySelector('.cityInput');
cityInput.addEventListener('input', handleCityInput);

function handleCityInput(event) {
   const inputValue = event.target.value;
   // Limpar o timeout anterior, se existir
   clearTimeout(timeoutId);
   // Definir um novo timeout para aguardar antes de fazer a solicitação à API
   timeoutId = setTimeout(() => {
      // Fazer a solicitação à API para obter as sugestões de autocompletar
      const apiKey = 'ea9e8fdb5f074392af0160830232705';
      const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${inputValue}`

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
   // Limpar a lista de sugestões existentes
   autocompleteList.innerHTML = '';
   // Criar e adicionar novos itens de sugestão à lista
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
}
