var User = require('../model/UserModel');
var PasswordToken = require('../model/PasswordTokenModel');

var secret = "dasdaksa2sDasf2224asda54a5sdas5d4d5a455a4sda55d4as5da4s5d444sd";

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class UserController {

    async index(req, res){
        var users = await User.findAll();
        res.status(200);
        res.json(users);
    }

    async findUser(req, res){
        var id = req.params.id;
        var user =await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({})
        }else{
            res.status(200);
            res.json(user)
        }
    }

    async create(req, res){
        var {email, nome, senha } = req.body;

        console.log(req.body);

        if(email ==  undefined || email == '' || email == ' '){
            res.status(400);
            res.json({err: 'Email inválido!'});
            return;
        }
        if(senha == undefined || senha == '' || senha == ' '){
            res.status(400);
            res.json({err: 'Senha inválida!'});
            return;
        }
        
        var emailExist = await User.findEmail(email);

        if(emailExist){
            res.status(406);
            res.json({err: "O email já está cadastrado!"});
            return;
        }
        
        await User.new(email, senha, nome);

        res.status(200);
        res.send("Tudo OK!")
    }

    async edit(req,res){
        var {id, nome, email, role} = req.body;
        var result = await User.Update(id,email,nome, role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo Ok");
            }else{
                res.status(406);
                res.json(result);
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req,res){
        var id = req.params.id;

        var result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo OK.");
        }else{
            res.staus(406);
            res.send(result.err);
        }
    }

    async recoveryPassword(req,res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if(result.status){
            res.status(200);
            res.send(toString(result.token));
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req,res){
        var token = req.body.token;
        var senha = req.body.senha;
        var isTokenValid = await PasswordToken.validate(token);

        if(isTokenValid.status){
            await User.changePassword(senha, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        }else{
            res.status(406);
            res.send("Token inválido!");
        }
    }

    async login(req,res){
        var {email, senha} = req.body;

        var user = await User.findByEmailForLogin(email);
        
        if(user != undefined){
            var resultado = await bcrypt.compare(senha, user.senha);
            console.log(resultado)
            if(resultado){
                var token = jwt.sign({email:user.email, role: user.role},secret);

                res.status(200);
                res.json({token: token});
            }else{
                res.status(406);
                res.json({err: "Senha incorreta."});
            }
        }else{
            res.status(406);
            res.json({status: resultado, err: "Usuario não existe."});
        }
    }
}

module.exports = new UserController();