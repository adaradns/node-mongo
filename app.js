var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var app = express();

//Montando los middlewares
app.use("/public",express.static('public'));

//Leer parametros de peticion
app.use(bodyParser.json()); //Para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));

var port = 8080;

app.set("view engine", "jade");


app.get("/", function(req, res){
	res.render("index");
});

app.get("/login", function(req, res){
	User.find(function(err, doc){
		console.log(JSON.stringify(doc)﻿);
		res.render("login");
	});
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
	user.save(function(err){
		if(err){
			console.log(String(err));
		}
		res.send("Guardamos tus datos");
	});
});

app.listen(port);