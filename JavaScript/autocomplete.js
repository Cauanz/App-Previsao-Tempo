// const input = document.querySelector('.cityInput');
// const sugestoesDiv = document.querySelector('.sugestoesDiv');

// input.addEventListener('input', () => {
//    if (input.value.length > 0) {
//       sugestoesDiv.style.display = 'block';
//    } else {
//       sugestoesDiv.style.display = 'none';
//    }
// });

// TODO - Talvez terminar o autocomplete/sugestões

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