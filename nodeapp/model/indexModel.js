const requestPromise = require("request-promise");
class IndexModel{
    update(){
        const options = {
            uri: "http://localhost/praise/praise.php",
            method:"GET"
        }

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

module.exports = IndexModel;