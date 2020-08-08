function pageGiveClasses (req,res) {
    const data = req.body;

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