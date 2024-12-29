let express = require("express");
let app = express();

app.get("/",(req,res)=>{
    res.status(200);
    res.json({success: true});
})

app.get("/cor/:pessoa",(req,res)=>{
    let pessoa = req.params.pessoa;
    if(pessoa == "diego"){
        res.json({cor: "vermelho", color: "red"});
    }
})

module.exports = app;