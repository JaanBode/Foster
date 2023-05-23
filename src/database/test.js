const Database = require('./db');
const saveStore = require('./saveStore');

Database.then(async db =>{
    

    //inserir dados na tabela
    await saveStore(db, {
        id: 1,
        lat: "-26.226226",
        lng: "-52.6687603",
        name: "Lojao ao lado",
        about: "lore ipsulum",
        whatsapp: "9898098765",
        images: [
            "https://i.pinimg.com/280x280_RS/d0/13/35/d01335f147c586e56829415e611f0ae7.jpg",
            "https://www.kindpng.com/picc/m/178-1788578_anime-meme-png-transparent-png.png",
            "https://i.pinimg.com/736x/b6/b5/9b/b6b59b0ec57a4f13cef44ce42c77e6bc.jpg",
        ].toString(),
        instructions: "Vire a esquerda",
        opening_hours:"Horário de visitas Das 18h até 8h",
        open_on_weekends:"1"
    })

    //consultar dados da tabela
    const selectedStores = await db.all("SELECT * FROM stores")
    console.log(selectedStores);
    //consultar somente 1 orfanato, pelo id
    const store = await db.all('SELECT * FROM stores WHERE id = "2"')
    console.log(store);
    //deletar dado da tabela
    await db.run("DELETE FROM stores WHERE id ='4'")
})