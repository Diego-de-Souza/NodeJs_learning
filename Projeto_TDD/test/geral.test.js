var app = require("../index");
let supertest = require("supertest");

let request = supertest(app);

test("A aplicação deve responder na porta 3131",()=>{
    //sempre na frente de uma promisse colocar um return antes
   return request.get("/").then(res => expect(res.statusCode).toEqual(200))

   /**Outra forma de trabalhar com async/await 
    * let res = await request.get("/");
    * expect(res.statusCode).ToEqual(404); //espqerado o erro
   */
});

//teste com multipla verificação
test("Deve retornar vermelho como cor favorita do Diego", ()=>{
    return request.get("/cor/diego",()=>{
        expect(res.statusCode).toEqual(200)
        expect(res.body.cor).toEqual("vermelho")
        expect(res.body.color).toEqual("red")
    })
})