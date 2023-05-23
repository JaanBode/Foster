// passar os objetos direto pra dentro da função
module.exports ={
    saveStore(db, store){
        return db.run(`
        INSERT INTO stores (
            lat,
            lng,
            name,
            about,
            whatsapp,
            images,
            instructions,
            opening_hours,
            open_on_weekends
        ) 
        VALUES (
            "${store.lat}",
            "${store.lng}",
            "${store.name}",
            "${store.about}",
            "${store.whatsapp}",
            "${store.images}",
            "${store.instructions}",
            "${store.opening_hours}",
            "${store.open_on_weekends}"
        );
    `)
    }
} 


//module.exports = saveStore;
