const rutas=require("express").Router();
const cors=require("cors");
const multer=require("multer");
const express =require("express")


const { prueba, insertRegistro, algunosRegistros, todosRegistros, editarItem, modificarItem, eliminarItem } = require("../controllers/abm.controllers.js");
const { login } = require("../controllers/login.controllers.js");

const upload=multer();
rutas.use(cors());
rutas.use(express.json())


// RUTAS OPERACIONES

rutas.get('/',prueba)
rutas.get('/registros/algunos',algunosRegistros)
rutas.get('/registros/todos',todosRegistros)
rutas.post('/registros/insert',upload.any(),insertRegistro)
rutas.get('/registro/editar/:id',editarItem)
rutas.put('/registro/modificar/:datos',modificarItem)
rutas.delete('/registro/eliminar/:id',eliminarItem)


// RUTAS LOGIN ***//

rutas.post('/login',upload.any(),login )




module.exports = rutas;