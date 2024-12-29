var knex = require('../dataBase/connection');
var bcrypt = require('bcrypt');
var PasswordToken = require('./PasswordTokenModel');

class User {

    async findAll(){
        try{
            var result = await knex.select(["id","email","nome","role"]).table("tbUsers");
            return result;
        }catch(err){
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","email","nome","role"]).table("tbUsers").where({id:id});
            return result;
        }catch(err){
            return undefined;
        }
    }

    async new(email, senha, nome){
        try{

            var hash = await bcrypt.hash(senha,10);

            await knex.insert({email, senha: hash, nome, role: 0}).table("tbUsers")

        }catch(err){
            console.log(err)
        }
        
    }

    async findEmail(email){
        try{
            var result = await knex.select("*").from("tbUsers").where({email:email});

            if(result.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            return false
        }
    }

    async Update(id, email, nome, role){
        try{
            var user = await this.findById(id);
            if(user != undefined){
                var editUser = {};
                if(email != undefined){
                    if(email != user.email){
                        var result = await this.findEmail(email);
                        if(result == false){
                            editUser.email = email;
                        }
                    }
                }

                if(nome != undefined){
                    editUser.nome = nome;
                }

                if(role != undefined){
                    editUser.role = role;
                }

                try{
                    await knex.update(editUser).where({id:id}).table("tbUsers");
                    return {status: true};
                }catch(err){
                    return {status: false, err: "O email já está cadastrado."}
                }

            }else{
                return undefined;
            }
        }catch(err){

        }
    }

    async delete(id){
        var user = await this.findById(id);
        console.log(id);
        if(user != undefined){
            try{
                await knex.delete().where({id:id}).table("tbUsers");
                return {status: true}
            }catch(err){
                return {status: false, err: "O usuário não existe, portanto não pode ser deletado."};
            }
        }else{
            return {status: false, err: "O usuário não existe, portanto não pode ser deletado."};
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(["id","email","nome","role"]).table("tbUsers").where({email: email});
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            return undefined;
        }
    }

    async changePassword(newPassword, id, token){
        var hash = await bcrypt.hash(newPassword,10);
        await knex.update({senha: hash}).where({id: id}).table('tbUsers');
        await PasswordToken.setUsed(token); 
    }

    async findByEmailForLogin(email){
        try{
            var result = await knex.select(["id","email", "senha","nome","role"]).table("tbUsers").where({email: email});
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            return undefined;
        }
    }
}

module.exports = new User;