const supertest = require('supertest');
const app = require("../app")

function request(){
    return supertest(app.listen())
}

describe("Test API",()=>{
    it("Test update",(done) => {
        request()
            .get("/index/update")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)            
            .end((err,res) => {
                const { body } = res;
                if(!body.result) throw "数据返回错误";
                return done();
            })
    });
})