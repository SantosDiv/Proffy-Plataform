//Dados
const proffys = [
    {
        name:"Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "981255227",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "40",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },//object
    {
        name:"Daniele Evangelista",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "981255227",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "30",
        weekday: [2],
        time_from: [720],
        time_to: [1220]
    },//object
    {
        name:"Diogenes Santos",
        avatar: "https://avatars0.githubusercontent.com/u/68401286?s=460&u=3e1d89dc810f49bad0d7c5fe3d5f028db9e2b270&v=4",
        whatsapp: "981255227",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Matemática",
        cost: "2000",
        weekday: [5],
        time_from: [720],
        time_to: [1220]
    }//object
]
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
//funcções de pegar os caminhos das pastas. pedidos e respostas

function getSubject(subjectNumber){
    const position = +subjectNumber - 1; // O + é para garantir que é um numero. E a subtração é para que inicie do 0
    return subjects[position];
}

function pageLanding(req,res){
    return res.render("index.html") // dirname é o caminho da pasta
}

function pageStudy(req,res){
    const filters = req.query;
    return res.render("study.html", { proffys, filters, subjects, weekdays } ); // __dirname é o caminho da pasta (diretório). foi apagado pois eu já coloquei o caminho no template nunjucks
}

function pageGiveClasses (req,res) {
    const data = req.query;

    // to pegando as chaves e trasnformando em um array
    const isNoEmpty = Object.keys(data).length > 0; //vendo se esse array ta vazio ou não

    if(isNoEmpty){

        data.subject = getSubject(data.subject);

        //adicionar data a lista de proffys
        proffys.push(data);

        return res.redirect("/study");
    }
    
    // se não 
    return res.render("giveClasses.html", {subjects, weekdays}) // dirname é o caminho da pasta
}

//Servidor (Startar servidor: npm run dev)
// pegar uma dependencia
const express = require('express');
const server = express();

//Configurar o nunjukts
const nunjucks = require('nunjucks'); //Atribuindo poderes ao HTML com o Tamplate Engine - Ele usa de estratégias de programação para fazer o HTML
//configurações do Nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server //Confirguações do servidor. todos os Pontos referec-se a esse 'server'
// Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public")) //use é uma confirguração do servidor. Aqui estou dizendo para o meu servidor para usar a pasta public como a pasta raiz. Para que o meu css funcione.

//Pegando os caminhos das pastas por .get
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/giveClasses", pageGiveClasses)
.listen(5500) // express é uma function. Logo precisa dos (). O listem é ouvir. e coloco uma porta

