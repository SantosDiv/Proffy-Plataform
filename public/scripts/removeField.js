// Find button
document.querySelector("#remove-time")
const fatherFields = document.querySelector("#schedule-items")
// Quando clicar no botão
.addEventListener('click', removeClone)

function removeClone(fatherFields){
   fatherFields.parentNode.removeChild(fatherFields);
}