//Servidor (Startar servidor: npm run dev)
// pegar uma dependencia
const express = require('express');
const server = express();

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages');

//Configurar o nunjukts
const nunjucks = require('nunjucks'); //Atribuindo poderes ao HTML com o Tamplate Engine - Ele usa de estratégias de programação para fazer o HTML
//configurações do Nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server //Confirguações do servidor. todos os Pontos referec-se a esse 'server'
// receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// Configurar arquivos estáticos (css, scripts, imagens)

.use(express.static("public")) //use é uma confirguração do servidor. Aqui estou dizendo para o meu servidor para usar a pasta public como a pasta raiz. Para que o meu css funcione.

//Pegando os caminhos das pastas por .get
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/giveClasses", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500) // express é uma function. Logo precisa dos (). O listem é ouvir. e coloco uma porta

