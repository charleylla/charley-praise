// 使用 supertest 进行接口测试
import supertest from "supertest";
import app from "../src/app"

// 这里使用了 app 监听的端口
function request(){
    return supertest(app.listen())
}

describe("Test API",()=>{
    it("Test update",(done) => {
        request()
            .get("/index/update")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)            
            .end((err,res) => {
                const { body } = res;
                console.log("=========")
                console.log(body)
                console.log("=========")
                if(!body.result) throw "数据返回错误";
                return done();
            })
    });
})