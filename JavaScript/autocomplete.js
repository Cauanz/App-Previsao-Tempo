const input = document.querySelector('.cityInput');
const sugestoesDiv = document.querySelector('.sugestoesDiv');

input.addEventListener('input', () => {
   if (input.value.length > 0) {
      sugestoesDiv.style.display = 'block';
   } else {
      sugestoesDiv.style.display = 'none';
   }
});
