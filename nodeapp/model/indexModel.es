// 使用 request-premise 库来请求后端的接口
// 使用该库时也需要安装 promise 库
import requestPromise from "request-promise";
// IndexModel 为模型层，用来提供（请求）数据服务
class IndexModel{
    update(){
        // 配置请求路径
        const options = {
            uri: "http://localhost/praise/praise.php",
            method:"GET"
        }

        // Promise 风格
         return new Promise((res,rej) => {
            requestPromise(options).then((data) => {
                data = JSON.parse(data);
                if(data.code === 1){
                    res(data);
                }else{
                    rej(data);
                }
            });
        });
    }
}

export default IndexModel;