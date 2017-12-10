var express = require("express");

var router = express.Router();

/* CREANDO RUTAS MODULARES */

router.get('/', function(req, res){
	/* Buscar el usuario */
	
	res.render("app/home");
});


/* EXPORTANDO LAS RUTAS */
module.exports = router;