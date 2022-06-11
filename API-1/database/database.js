const mysql=require("mysql");
require("dotenv").config();


const cnx=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:'',
    port:process.env.PUERTO,
    database:process.env.DATA_BASE
    
})


cnx.connect((error)=>{

    if(error){
       console.log(error)
    }else{
        console.log("BD to connect Successfully");
    }
   
})


module.exports=cnx;