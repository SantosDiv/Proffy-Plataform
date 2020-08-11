/*NOTAS:
    - Se eu não tiver a palavra async na frente da minha função, eu não consigo chamar o 'await' 
*/


module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    // inserir dados na tabela de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            nome,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.nome}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `) // Essa linha vai aguardar essa linha executar (await)
    const proffy_id = insertedProffy.lastID;

    // inserir dados na tabela Classes
    const insertedClassValues = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)
    const class_id = insertedClassValues.lastID;

    // Inserir dados na tabela class_shcedule
    // O map é um loop que vai mapear o meu array
    // Guardando para executar abaixo
    const insertedAllClassScheduleValues = classScheduleValues.map((values) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to 
            ) VALUES (
                "${class_id}",
                "${values.weekday}",
                "${values.time_from}",
                "${values.time_to}"
            );
        `)
    })
    
    
    // Aqui vamos executar o array do classSchedule. Ele ta dizendo que vai aguarda todas as promessas e executar todos.
    await Promise.all(insertedAllClassScheduleValues)
}