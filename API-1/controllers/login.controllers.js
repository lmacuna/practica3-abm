const cnx = require("../database/database")

require("dotenv").config()


const login=(req,res)=>{
    try {
        
        var { email,contrasenia}=req.body
        cnx.query(process.env.CREATE_TABLE_LOGIN, (error) => {

            if (error) {
                console.log(error)
            }
        })
        cnx.query(process.env.LOGIN_SELECT+`'${email}' and contrasenia='${contrasenia}'; `,(error,result)=>{
            var seguir=false;
               if(error){
                   console.log(error)
               }else if(result[0]!==undefined){
                   console.log(result)
                   seguir=true
                   return res.json({result:process.env.ACCESS})
                   
               }else if(seguir===false){
                console.log("No encontrado")
                return res.json({result:"No encontrado"})
               }

        })

        

        
    } catch (error) {
        return res.sendStatus(500).json({message:error.message})
    }
}


module.exports= {login}