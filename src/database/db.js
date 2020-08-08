/*para instalar o sqlite. npm install sqlite-async*/
/* Para rodar o Database no terminal: node src/database/db.js (caminho do arquivo dentro do projeto)*/
/* Plugin SQLlite para o VScode para visualizar o database - instalado!*/

const Database = require('sqlite-async'); //fazendo a requisição do banco de dados sqlite

// Função de execuçaõ do db
function execute(db){
    // funcionalidade 'exec' vai ser onde iremos digitar o SQL
    // Criar as tabelas do Banco de Dados
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `);
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute); //abrindo o banco de dados e então (then) depois executar a função 'execute' e então exportando o DB para eu ter acesso em outros arquivos.
