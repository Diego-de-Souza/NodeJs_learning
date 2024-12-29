var knex = require('../dataBase/connection');
var User = require('./UserModel');

class PasswordToken {
    async create(email){
        var user = await User.findByEmail(email);
        if(user != undefined){
            try{
                var token = date.now();
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: tooken
                }).table('tbPasswordRecovery')

                return {status:true, token: token};
            }catch(err){
                return {status: false, err: "O e-mail passado não existe no banco de dados."}
            }
            
        }else{
            return {status: false, err: "O e-mail passado não existe no banco de dados."}
        }
    }

    async validate(token){
        try{
            var result = await knex.select().where({token: token}).table('tbPasswordRecovery');
            
            if(result.length > 0){
                var tk = result[0];

                if(tk.used){
                    return {status: false};
                }else{
                    return {status:true, token: tk}
                }
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table('tbPasswordRecovery');
    }
}

module.exports = new PasswordToken();