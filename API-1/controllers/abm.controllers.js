const cnx = require('../database/database.js')
require("dotenv").config()


const prueba = (req, res) => {
    try {
        return res.json({ messaje: "Bienvenidos desde API-1" })

    } catch (error) {
        return res.sendStatus(500).json({ message: error.message })
    }
}




//CONTROLLING OBTENER LOS ULTIMOS 10 REGISTROS
const algunosRegistros = (req, res) => {

    try {
        cnx.query(process.env.CREATE_TABLE, (error) => {

            if (error) {
                console.log(error)
            }
        })
        cnx.query(process.env.OPERACIONES_ALGUNAS, (error, result) => {

            if (error) {
                console.log(error)
            } else if (result) {
                return res.json(result)
            }
        })

    } catch (error) {

        return res.sendStatus(500).json({ message: error.message });
    }
}




//CONTROLLING OBTENER TODOS LOS REGISTROS
const todosRegistros = (req, res) => {

    try {
        cnx.query(process.env.OPERACIONES, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                return res.json(result);
            }

        })
    } catch (error) {
        return res.sendStatus(500).json({ message: error.message });
    }
}




//CONTROLLING INSERTAR UN REGISTRO
const insertRegistro = (req, res) => {
    console.log(req.body)
    try {
    
        const { concepto, monto, fecha, tipo } = req.body


        cnx.query(process.env.OPERACIONES_INSERT + `'${concepto}',${monto},'${fecha}','${tipo}')`, (error) => {

            if (error) {
                console.log(error);
            } else {

            }
            cnx.query(process.env.OPERACIONES_ALGUNAS, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    return res.json(result);
                }
            })

        })



    } catch (error) {
        return res.sendStatus(500).json({ message: error.message })
    }
}





//CONTROLLING EDITAR UN REGISTRO
const editarItem = (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        cnx.query(process.env.OPERACION_EDIT + id, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                return res.json(result)
            }
        })
    } catch (error) {
        return res.sendStatus(500).json({ message: error.message })
    }
}





//CONTROLLING MODIFICAR UN REGISTRO
const modificarItem = (req, res) => {
    var { datos } = req.params
    datos = JSON.parse(datos)
    try {

        console.log(datos.id)
        monto = datos.monto
        id = datos.id
        cnx.query(process.env.OPERACION_UPDATE + `${monto} where id=${id};`, (error) => {
            if (error) {
                console.log(error)
            } else {

                return res.json({ result: "modificado" })
            }
        })

    } catch (error) {
        return res.sendStatus(500).json({ message: error.message })
    }
}





//CONTROLLING ELIMINAR UN REGISTRO
const eliminarItem = (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        cnx.query(process.env.OPERACION_DELETE + id, (error) => {
            if (error) {
                console.log(error)
            } else {
                return res.json({ result: "Item eliminado correctamente" })
            }
        })

    } catch (error) {
        return res.sendStatus(500).json({ message: error.message })
    }
}





module.exports = { prueba, algunosRegistros, insertRegistro, todosRegistros, editarItem, modificarItem, eliminarItem };