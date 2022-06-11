const app =require('./app.js');
require("dotenv").config();



app.set('port',process.env.PORT||4000);


app.listen(app.get('port'),(error)=>{
    if(error){
        throw error
    }
    console.log(`API running on port ${app.get('port')}`)
})



