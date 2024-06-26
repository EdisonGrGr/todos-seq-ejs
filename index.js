//Crear servidor
require('dotenv').config() 
const express = require('express')
const routerTodos = require('./routes')
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
//middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// Configuración de express-session y connect-flash
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Middleware a nivel de aplicación para logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//Middleware a nivel de aplicación
app.use((req, res, next)=>{
    /*console.log(req)
    console.log(req.params)
    console.log(req.query)
    console.log(req.ip)
    console.log('Middleware de aplicación')
    console.log(req.method, req.url)*/
    next()
})

//Rutas
routerTodos(app)
app.set('views', './src/views')
app.set('view engine', 'ejs')

//Levantando el servidor para escuchar por el puerto 4000
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
})