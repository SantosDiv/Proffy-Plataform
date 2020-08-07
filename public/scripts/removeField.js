// Find Button
document.querySelector('#remove-time')
.addEventListener('click', removeField);

function removeField(){
   //Econtrando o elemento Filho
   const elementChild = document.querySelector('.schedule-item');

   // Pegando a quantidade de filhos (com o children.length)
   const itemFather = document.querySelector('#schedule-items');
   const numberChilds = itemFather.children.length;

   //condição para impedir de apagar o primeiro e o segundo child (titulo e primeiros selects/inputs) 
   if(numberChilds>2){ 

      //removendo filhos adicionados
      document.querySelector('#schedule-items').removeChild(elementChild); //#schedule-items é o pai
   }

   /*const lastChild = document.querySelector('#schedule-items').lastElementChild;
   document.querySelector('#schedule-items').removeChild(lastChild); */
}
