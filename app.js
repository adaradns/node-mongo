var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session")

var app = express();

//Montando los middlewares
app.use("/public",express.static('public'));

//Leer parametros de peticion
app.use(bodyParser.json()); //Para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: "89a7fa9s8f7saf",
	resave: true, //Se vuelve a guardar la session aunque no haya sido modificada
	saveUninitialized: false //Se guarda la session si es nueva
}));

var port = 8080;

app.set("view engine", "jade");


app.get("/", function(req, res){
	console.log(req.session.user_id);
	res.render("index");
});

app.get("/signup", function(req, res){
	User.find(function(err, doc){
		console.log(JSON.stringify(doc)﻿);
		res.render("signup");
	});
});

app.get("/login", function(req, res){
		res.render("login");
});

app.post("/users", function(req, res){
	var user = new User(
		{
			email: req.body.email, 
			password: req.body.password,
			password_confirmation: req.body.password_confirmation,
			username: req.body.username
		});
	console.log(user.password_confirmation);
	console.log(user.email);
	console.log(user.password);
	
	user.save().then(function(us){
		res.send("Guardamos tus datos correctamente!");
	}, function(err){
		console.log(String(err));
		res.send("Hubo un error al guardar el usuario");
	});

});




app.post("/sessions", function(req, res){
	/***** METODOS FIND:  
		- Metodo find: Devuelve una coleccion de documentos que cumplen con una condicion.
		- Metodo findOne: Devuelve un solo documento
		- Metodo findById: Devuelve el documento el cual corresponde al _id que se le pasa como parametro (_id que genera mongo)
	*******/
	User.findOne(
		{
			email: req.body.email, 
			password: req.body.password
		}, function(err, user){
			req.session.user_id = user._id;
			res.send("Hola mundo!");
		});

});


/* DEFINICION DEL PREFIJO PARA MONTAR LAS RUTAS*/
app.use("/app", session_middleware);
app.use("/app", router_app);

app.listen(port);