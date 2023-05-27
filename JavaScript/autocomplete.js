async function getWeather(inputCity){
   const city = inputCity;
   const apiKey = 'ea9e8fdb5f074392af0160830232705';
   const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`
   
   fetch(apiUrl)
   .then((response) => response.json())
   .then((data) => {
      console.log(data);
      const cityName = document.querySelector('.cityName');
      const cityNameCard = document.querySelectorAll('.city-name');
      const city = data.location.name;
      const temperature = data.current.temp_c;
      cityName.innerHTML = `${city} | ${temperature}°C`;
      for (let i = 0; i < cityNameCard.length; i++) {
         cityNameCard[i].innerHTML = `${city}`;
      }
   })
   .catch((error) => {
      console.log(`Ocorreu um erro na solicitação dos dados ${error}`);
   });
}

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
         // Executar a ação desejada, como fazer uma nova solicitação à API para obter os dados da cidade selecionada
         getWeather(suggestion);
         // Limpar a lista de sugestões
         autocompleteList.innerHTML = '';
      });
      autocompleteList.appendChild(item);
   });
}
