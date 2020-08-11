//puxando o banco de dados
const Database = require('./database/db');

const { subjects, weekdays, getSubject, convertHouresToMinures } = require('./utils/format');

function pageLanding(req,res){
    return res.render("index.html") // dirname é o caminho da pasta
}

//Renderizaçaõ da página de sucesso
function pageSucess (req,res) {
    return res.render("sucess.html");
}


async function pageStudy(req,res){
    const filters = req.query;

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays } ); // __dirname é o caminho da pasta (diretório). foi apagado pois eu já coloquei o caminho no template nunjucks
    }
    // convertendo horas em minutis    
    const timeToMinutes = convertHouresToMinures(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id   
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes} 
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    ` 
    // caso haja erro na hora da consulta do banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        return res.render('study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error);
    }
    
}

function pageGiveClasses (req,res) {
    // se não 
    return res.render("giveClasses.html", {subjects, weekdays}) // dirname é o caminho da pasta
}

async function saveClasses (req, res){
    const createProffy = require('./database/createProffy')

   const proffyValue = {
        nome: req.body.nome,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) =>{
        return {
                weekday,
                time_from: convertHouresToMinures(req.body.time_from[index]),
                time_to: convertHouresToMinures(req.body.time_to[index]) 
        }
     })

     

     try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/sucess" + queryString)
     } catch (error) {
         console.log(error)
     }
    
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSucess
}