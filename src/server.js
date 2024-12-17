//importar dependencia
const express = require('express');
const path = require('path');
const pages = require('./pages.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//iniciando o express
const port = 3000;
const server = express();


server
// Configurando o Swagger UI para servir a documentação da API
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//utilizar body do request
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
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});