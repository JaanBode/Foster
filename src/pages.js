const Database = require('./database/db');
const save = require('./database/saveStore');

module.exports = {

    index(require, response){
        return response.render('index')
    },
    async store(require, response){

        const id = require.query.id

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM stores WHERE id = "${id}"`)
            const store = results[0]

            store.images = store.images.split(",")
            store.firstImage = store.images[0]

            //fazer if ternario
            if(store.open_on_weekends == "0"){
                store.open_on_weekends = false

            } else {
                store.open_on_weekends = true
            }

            return response.render('store', {store})
        } catch (error){
            console.log(error);
            return response.send('Erro no banco de dados!')
        }
    },

    async stores(require, response){
        try{
            const db = await Database;
            const stores = await db.all("SELECT * FROM stores")
            return response.render('stores', {stores})

        } catch(error){
            console.log(error)
            return response.send('Erro no banco de dados!')
        }
    },

    createStore(require, response){
        return response.render('create-store')
    },

    async saveStore(require, response){
        const fields = require.body

        //validar se todos os dados foram preenchido
        if(Object. values(fields).includes('')){
            return response.send('Todos os campos devem ser preenchidos')
        }

        try {
            //salvar uma loja
            const db = await Database
            await save.saveStore(db,{
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends,
            })

            //redirecionamento
            return response.redirect('/stores')
            
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados!')
        }
    }
}