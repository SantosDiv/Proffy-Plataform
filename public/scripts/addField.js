// Procurar o botão 
document.querySelector("#add-time")
// Quando clicar no botão
.addEventListener('click', cloneField) //To aqui adicionando um 'ouvidor de Evento', ou seja, ele vai ver qual evento o meu usuário está fazendo. Neste caso um 'click' e ai, quando ele clicar ele vai ativar a função cloudFiled.

// Executar uma ação
function cloneField(){
    // Duplicar os campos. Que campos?
    //Vamos usar o Node para nos referenciar aos HTML
    const newFieldsContainer = document.querySelector('.schedule-item').cloneNode(true) //boolean: true or false. True ele vai pegar o pai e todos os filhos desse elemento.

    // pegar os campos para apagar os valores deles. Que campos?
    const fields = newFieldsContainer.querySelectorAll('input');

    // Para cada campo, limpar
    fields.forEach(function(field) {
        // Limpar o campo do momento
        field.value = "";
    });

    // Colocar na página: onde?
    document.querySelector('#schedule-items').appendChild(newFieldsContainer)
}
    