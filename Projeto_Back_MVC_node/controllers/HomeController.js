class HomeController {

    async index(req, res){
        res.send("APP EXPRESS! funcionando")
    }

    async validate(req, res){
        res.status(200);
        res.send("okay");
    }
}

module.exports = new HomeController();