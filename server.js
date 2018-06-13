const express		= require('express');
const bodyParser	= require('body-parser');
const app 			= express();
const dbConfig		= require('./config/database.config.js');
const mongoose		= require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(() => {
	console.log("Conectado a la base de datos");
}).catch(err => {
	console.log('No se pudo conectar a la base de datos');
	process.exit();
});

//Mensaje si no hay parametros
app.get('/', (req, res) => {
	res.json({ "message": "Listado de usuarios." });
});

require('./app/routes/user.routes.js')(app);

app.listen(3000, () => {
	console.log("El servidor escuchado en el puerto 3000");
});