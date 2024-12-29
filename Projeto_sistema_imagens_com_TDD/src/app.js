let express = require("express");
let app = express();
let mongoose = require("mongoose");
let user = require("../models/User");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let JWTSecret = "dfskçmdfçskdnfkskdlnflsndkflhslkdhflksdf1561561sd65f1s5d6fs56df156s1df56s5dF";

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect("mongodb://<servidor>:27017/<nome do banco>",{useNewUrlParser: true, useUnifiedTopoly: true})
    .then(()=>{
        // console.log("Conectado com o Banco.");
    }).catch((err)=>{
        console.log(err);
    })

let User = mongoose.model("User",user); 

app.get("/", (req,res)=>{
    res.json({});
})

app.post("/user", async (req,res)=>{
    let newUser = new User({name:req.body.name, email: req.body.email, password: req.body.password})
    let hash = "";

    if(newUser.name == "" || newUser.email == "" | newUser == ""){
        res.sendStatus(400);
        return;
    }

    try{
        let user = await User.findOne({"email": newUser.email});
        if(user != undefined){
            res.statusCode(400);
            res.json({error: "E-mail já cadastrado."})
            return;
        }
    }catch(err){
        res.sendStatus(500);
    }

    try{
        let password = newUser.password;
        let salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(password,salt);
        newUser.password = hash;
    }catch(err){
        res.sendStatus(400);
        res.json({error: "Erro na criação do hash."})
    }
    

    try{
        await newUser.save();
        res.json({email: req.body.email});
    }catch(err){
        res.sendStatus(500);
    }
})

app.post("/auth", async (req,res)=>{
    let {email, password} = req.body;

    let user = await User.findOne({"email":email})

    if(user == undefined){
        res.statusCode = 403;
        res.json({erros: {email: "E-mail não cadastrado."}})
        return;
    }

    let isPasswordRight = await bcrypt.compare(password, user.password);

    if(!isPasswordRight){
        res.statusCode = 403;
        res.json({errors:{password: "Senha digitada está incorreta."}})
        return;
    }

    jwt.sign({email: email,name:user.name, id: user._id},JWTSecret, {expiresIn: '48h'}, (err, token)=>{
        if(err){
            res.sendStatus(500);
            console.log(err)
        }else{
            res.json({token:token});
        }
    });
})

app.delete("/user:email", async (req,res)=>{
    let email = req.params.email;
    await User.deleteOne({"email": email})
    res.sendStatus(200);
})

module.exports = app;