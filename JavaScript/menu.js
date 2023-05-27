//@ts-check
const menu = document.querySelector('.menu-items');
const menuButton = document.querySelector('.menuButton');

if(menuButton){
   menuButton.addEventListener('click', () => {
      if(menu) {
         menu.classList.toggle('show-menu-items');
      }
   })
}


document.addEventListener('click', (event) => {
   const targetElement = event.target;
   //@ts-ignore
   if (!menu?.contains(targetElement) && targetElement !== menuButton) {
      menu?.classList.remove('show-menu-items');
   }
});
