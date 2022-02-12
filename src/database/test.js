const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then(async db =>{
    

    //inserir dados na tabela
    await saveOrphanage(db, {
        id: 1,
        lat: "-26.226226",
        lng: "-52.6687603",
        name: "Lar das meninas",
        about: "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulneravilidade social.",
        whatsapp: "9898098765",
        images: [
            "https://i.pinimg.com/280x280_RS/d0/13/35/d01335f147c586e56829415e611f0ae7.jpg",
            "https://www.kindpng.com/picc/m/178-1788578_anime-meme-png-transparent-png.png",
            "https://i.pinimg.com/736x/b6/b5/9b/b6b59b0ec57a4f13cef44ce42c77e6bc.jpg",
        ].toString(),
        instructions: "Venha se sentir a vontade e traga muito amor e paciência para dar.",
        opening_hours:"Horário de visitas Das 18h até 8h",
        open_on_weekends:"1"
    })

    //consultar dados da tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")

    //consultar somente 1 orfanato, pelo id
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "2"')

    //deletar dado da tabela
    await db.run("DELETE FROM orphanages WHERE id ='4'")
})