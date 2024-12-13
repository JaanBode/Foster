//importar dependencia
const express = require('express');
const path = require('path');
const pages = require('./pages.js');
const port = 3000;

//iniciando o express
const server = express()

server
//utilizar body do require
.use(express.urlencoded({extended: true}))
// utilizando arquivos estaticos
.use(express.static('public'))
//configurar template engine
.set('views', path.join(__dirname, "views"))
.set('view engine', 'hbs')
//criar uma rota
.get('/', pages.index)
.get('/store', pages.store)
.get('/stores', pages.stores)
.get('/create-store', pages.createStore)
.post('/save-store', pages.saveStore)

//ligar o servidor
server.listen(process.env.PORT || port)
