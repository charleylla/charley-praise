/**
 * E2E 测试，是用户行为测试
 * 通过模拟用户对浏览器的行为来进行测试，这里模拟用户的点赞行为
 */
const {
    Builder,
    By,
    until
} = require('selenium-webdriver');

// 采用 Firefox 进行 E2E 测试，因为 Firefox 对于 selenium-webdriver 的支持性较好
const driver = new Builder()
    .forBrowser('firefox')
    .build();

;(function testPraise(){
    // 使用火狐浏览器打开 http://localhost:8888
    // 需要事先使用 npm run serve 启动服务器
    driver.get('http://localhost:8888');
    // 5s 后进行测试，因为打开浏览器可能需要一些时间
    setTimeout(()=>{
        // 通过 id 获取手型元素
        const box = driver.findElement(By.id('box'));
        let i = 0;
        // 每 1s 执行 1 次点击模拟
        const timer = setInterval(()=>{
            // 当点击 10 次之后，停止点击，退出测试
            if(i == 10){
                clearInterval(timer);
                console.log("Done")
                driver.quit();
                return;
            }
            // 每次点击后输出点击的次数
            i++;
            console.log(i)
            box.click();
        },1000)
    },5000)
})();