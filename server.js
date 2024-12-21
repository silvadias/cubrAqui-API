const express   = require("express")
const app       = express()


app.get("/",function(req,res){
    res.sendfile(__dirname + "/http/index.html")
})

app.listen(3000,function(){
    console.log("aplicação rodando na porta 3000")
})

