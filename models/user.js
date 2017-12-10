var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Lo pide a partir de la nueva version
mongoose.Promise = require('bluebird');

//Conexion a mongo
mongoose.connect("mongodb://localhost/fotos", { useMongoClient: true });

/*
	TIPOS DE DATOS A DEFINIR EN UN DOCUMENTO MONGO
	String
	Number
	Data
	Buffer
	Boolean
	Mixed
	Objectid
	Array
*/

var posibles_valores = ["M", "F"];
var email_match = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Coloca un email valido"];


var user_schema = new Schema({
	name: String,
	username: {
		type: String,
		require: true,
		maxlength: [50, "No puede superar los 50 caracteres"]
	},
	password: {
		type: String,
		minlength: [8, "El password no puede tener menos de 8 caracteres"],
		validate: {
			validator: function(pass){
			return this.password_confirmation == pass;
			},
			message: "Las passwords no coinciden"
		}

	},
	age: {
		type: Number, 
		min:[5, "La edad no puede ser menor que 5 años"], 
		max:[100, "La edad no puede superar los 100 años"]
	},
	email: {
		type: String,
		require: "*El email es un campo obligatorio",
		match: email_match
	},
	date_birth: Date,
	sex: {
		type: String, 
		enum: {
			values: posibles_valores,
			message: "Opcion invalida"
		}
	}
});
	


user_schema.virtual("password_confirmation")
	.get(function(){
		return this.pc;
	}).set(function(password){
		this.pc = password;
	});

var User = mongoose.model("User", user_schema);

module.exports.User = User;