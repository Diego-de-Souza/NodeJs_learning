var jwt = require('jsonwebtoken');
var secret = "dasdaksa2sDasf2224asda54a5sdas5d4d5a455a4sda55d4as5da4s5d444sd";

module.exports = function(req, res, next){
    
    const authToken = req.headers['authorization']
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token  = bearer[1];

        try{
            var decoded = jwt.verify(token, secret);
            if(decoded.role == 1){
                next();
            }else{
                res.status(403);
                res.json({message: "Você não tem permissão para isso"});
                return;
            }
        }catch(err){
            res.status(403);
            res.json({message: "Você não tem permissão para isso"});
            return;
        }
        
    }else {
        res.status(403);
         res.json({message: "Você não está autenticado."});
        return;
    }
}