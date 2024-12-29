var database = require('./dataBase');

var dados = {
    nome: "Sea of Thieves",
    preco: 50.54
}

//obs. o query builder é uma promisse então sempre está retornando uma reposta
//exemplo de insert
var query = database.insert(dados).into("games").then(data => {
    console.log(data)
}).catch(err=>{
    console.log(err);
})

//exemplo de select
database.select().table("games").then( data =>{
    console.logr(data);
}).catch(err=>{
    console.log(err);
})

//exemplo de select com campos selecionados
database.select(["id","preco"]).then( data =>{
    console.logr(data);
}).catch(err=>{
    console.log(err);
})

// consultas aninhadas
database.insert({nome: "Mists of noyah",preco: 25}).into("games".then(data =>{
    database.select(["id","preco"]).then( data =>{
        console.logr(data);
    }).catch(err=>{
        console.log(err);
    })
})).catch(err =>{
    console.log(err);
})

//consulta com where simples
database.where({nome: "Mists of noyah"}).table("games");

//consulta where com select
database.select(["id","preco"]).where({nome: "Mists of noyah"}).table("games");

//consulta encadeada com where e or
database.select(["id","preco"])
    .where({nome: "Mists of noyah"})
    .orWhere({id: 2})
    .whereRaw("preco > 50") //para tipos como like, != e etc.
    .table("games").then(data => {
        console.log(data);
    }).catch(err =>{
        console.log(err);
    })

//utillizando query natural
database.raw("select * from games").then(data =>{
    console.log(data)
}).catch(err=>{
    console.log(err);
})

//utilizando o delete
database.where({id: 3}).delete().table("games").then(data =>{
    console.log(data)
}).catch(err=> {
    console.log(err)
});

//fazendo update de dados
database.where({id: 5}).update({preco: 40}).table("games").then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

//utilizando o join
database.select(["games.*", "studios.nome as estudios"]).table("games").innerJoin("estudios","estudios.game_id","game.id").where("game_id", 20).then(data =>{
    console.log(data)
}).catch(err =>{
    console.log(err)
})

//exemplo de consulta avançada
database.select([
    "estudios.nom as studio_nome",
    "games.nome as game_nome",
    "games.preco"
    ]).table("games_studios")
    .innerJoin("games","games.id", "games_estudios.game_id")
    .innerJoin("estudios", "estudios.id", "games_estudios.estudio_id")
    .where("estudios.id", 2)
    .then(data=> {
        console.log(data)
    }).catch(err =>{
        console.log(err)
    })

//utilizando transaction
async function testeTrasaction(){
    try{
        await database.transaction(async trans =>{
            await database.insert({nome: "Pyxerelia"}).table("estudios");
            await database.insert({nome: "Fox"}).table("estudios");
            await database.where("estudio.id", 2).table("estudios");
            await database.insert({nome: "teste"}).table("estudios");
        })
    }catch(err){
        console.log(err)
    }
}

console.log(query.toQuery());