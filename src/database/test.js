const Database = require('./db');
const creatProffy = require('./createProffy')
Database.then(async (db) => {
    // inserir dados

    //Criei um objeto, para a tabela proffy
    proffyValue = {
        name:"Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "981255227",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    // Tabela Schedule
    classValue = {
        subject: "Química",
        cost: "40",
        // o proffy_id virá com o banco de datdos
    }
   
    // Por ter muitos horários , eu criei um array
    classScheduleValues = [
        // Dentro do array eu posso criar vários objects
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // inserindo os dados pela função creatProffy
    //await creatProffy(db, {proffyValue, classValue, classScheduleValues});

    // consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys");
    //console.log(selectedProffys);

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor

    const selectCalssesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    console.log(selectCalssesAndProffys);

    // 

})