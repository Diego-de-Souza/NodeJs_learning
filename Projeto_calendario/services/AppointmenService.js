var appointment = require('../models/Appointment');
var mongoose = require('mongoose');
var appointmentFatory = require('../factories/AppointmentFactory');
var AppointmentFactory = require('../factories/AppointmentFactory');
var mailer = require("nodemailer");


var Appo = mongoose.model('Appointment', appointment);

class Appointment {
    async create(name, email, description, cpf, date, time){
        var newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        });

        try{
            await newAppo.save();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async getAll(showFinished){
        if(showFinished){
            return await Appo.find();
        }else{
            var appos = await Appo.find({'finished': false});
            var appointments = [];

            appos.forEach(appointment =>{
                if(appointment.date != undefined){
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            })

            return appointments;
        }
    }

    async getById(id){
        try{
            var event = await Appo.findOne({'_id':id});

            return event;
        }catch(err){
            console.log(err);
        }
    }

    async Finish(id){
        try{
            await Appo.findByIdAndUpdate(id, {finished: true});
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
        
    }

    async Search(query){
        try{
            var appos = await Appo.find().forEach([{email: query},{cpf: query}])
            return appos;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async SendNotification(){
        try{
            var appos = await this.GetAll(false);

            var transporter = mailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 25,
                auth: {
                    user: "33213132",
                    pass: "dsdfsdsdfk"
                }
            })
            
            appos.forEach(async app =>{
                var date = app.start.getTime();
                var hour = 1000 * 60 * 60;
                var gap = date-Date.now();

                if(gap <= hour){
                    if(!app.notified){

                        await Appo.findByIdAndUpdate(app.id,{notified: true});

                        transporter.SendMail({
                            from: "Diego de Souza <diegodesouza.souza@gmail>",
                            to: app.email,
                            subject: "Sua consulta vai acontecer em breve!",
                            text: "Conteúdo qualquer!!!"
                        }).then(()=>{

                        }).catch(err=>{

                        })
                    }
                }
            })
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new Appointment();