var express = require('express');
var app = express();
var mongoose = require('mongoose');
const AppointmenService = require('./services/AppointmenService');

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine','ejs')

mongoose.connect("mongodb://localhost:27017/agendamento");
mongoose.set('useFindAndModify', false);

app.get('/',(req,res)=>{
    res.render("index");
})

app.get("/cadastro", (req,res)=>{
    res.render("create");
})

app.post("/create", async (req,res)=>{
    var {name, email, description, cpf, date, time} = req.body;

    var status = await AppointmenService.create(name, email, description, cpf, date,time);

    if(status){
        res.status(200);
        res.redirect("/");
    }else{
        res.status(406);
        res.json({err: "Ocorreu um erro na criação do dado no banco."})
    }
})

app.get("/getcalendar",async (req,res)=>{
    var appointments = await AppointmenService.getAll(false);
    res.json(appointments);
})

app.get("/event/:id", async (req,res)=>{
    var appointment = await AppointmenService.getById(req.params.id);
    res.render("event",{appo: appointment});
})

app.post("/finish", async (req,res)=>{
    var id = req.params.id;
    var result = await AppointmenService.Finish(id);
    res.redirect("/");
})

app.get("/list", async (req,res)=>{
    var appos = await AppointmenService.getAll(true);
    res.render("list",{appos});
})

app.get('/searchresult', async (req,res)=>{
    var appos = await AppointmenService.Search(req.query.Search);
    res.render("list",{appos});
})

var pollTime = 5 * 60000;
setInterval( async ()=>{
    try{
        await AppointmenService.SendNotification();
    }catch(err){
        console.log(err);
    }

},pollTime)

app.listen(8080, () =>{});