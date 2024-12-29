let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

let mainUser = {name: "Diego", email:"diegodesouza.souza@gmail.com", password: "123456"}

//global before
beforeAll(()=>{
    //Inserir usuário DIego no banco
    console.log("Olá mundo.");
    //criando o usuario no banco
    return request.post("/user")
        .send(mainUser)
        .then(res=>{ })
        .catch(err=>{console.log(err)})
})
//global after
afterAll(()=>{
    //remover o usuario do Banco
    console.log(("Tchaus mundo."));
    //deletando o usuario
    return request.delete("/user" + mainUser.email)
        .then(res=>{})
        .catch(err=>{console.log(err)})
})

describe("Cadastro de Usuário", ()=>{
    test("Deve cadastrar um usuário com sucesso",()=>{

        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name:"Diego", email: email, password: "123456"}

        return request.post("/user")
            .send(user)
            .then(res =>{
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email);
            }).catch(err=>{
                fail(err);
            })
    })

    test("Deve impedir que um usuario se cadastre com os dados vazios", ()=>{

        let user = {name:"", email: "", password: ""}

        return request.post("/user")
            .send(user)
            .then(res =>{
                expect(res.statusCode).toEqual(400); //Bad request
            }).catch(err=>{
                fail(err);
            })
    })

    test("Deve impedir que um usuário se cadastre com um e-mail repitido", ()=>{
        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name:"Diego", email: email, password: "123456"}

        return request.post("/user")
            .send(user)
            .then(res =>{
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email);

                return request.post("/user")
                    .send(user)
                    .then(res =>{
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.error).toEqual("E-mail já cadastrado.");
                    }).catch(err =>{
                        fail(err);
                    })
            }).catch(err=>{
                fail(err);
            })
    })
})

describe("Autenticação", ()=>{
    test("Deve me retornar um token quando logar",()=>{
        return request.post("/auth")
            .send({email: mainUser.email, password: mainUser.password})
            .then(res=>{
                expect(res.statusCode).toEqual(200);
                expect(res.body.token).toBeDefined();
            })
            .catch(err=>{
                fail(err);
            })
    })

    test("Deve impedir que um usuário com email não cadastrado se logue",()=>{
        return request.post("/auth")
            .send({email: "hghgjhg@htom.com", password: mainUser.password})
            .then(res=>{
                expect(res.statusCode).toEqual(403);
                expect(res.body.errors.email).toEqual("E-mail não cadastrado.");
            })
            .catch(err=>{
                fail(err);
            })
    })

    test("Deve impedir que um usuário com senha não cadastrado se logue",()=>{
        return request.post("/auth")
            .send({email: mainUser.email, password: "dfsdf0000"})
            .then(res=>{
                expect(res.statusCode).toEqual(403);
                expect(res.body.errors.password).toEqual("Senha digitada está incorreta.");
            })
            .catch(err=>{
                fail(err);
            })
    })
})