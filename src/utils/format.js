const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]
const weekdays = [
    "Domingo",
    "Terça-feira",
    "Segunda-feira",
    "Quinta-feira",
    "Quarta-feira",
    "Sábado",
    "Sexta-feira",
]

//Funcionalidades da aplicação
//funções de pegar os caminhos das pastas. pedidos e respostas

function getSubject(subjectNumber){
    const position = +subjectNumber - 1; // O + é para garantir que é um numero. E a subtração é para que inicie do 0
    return subjects[position];
}

function convertHouresToMinures(time){
    const [hour, minutes] = time.split(":") //split é transformando o meu string em um array com os ':' como separador desse array
    return Number((hour * 60) + minutes);
}
module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHouresToMinures
}