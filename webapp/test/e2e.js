const {
    Builder,
    By,
    until
} = require('selenium-webdriver');

let driver = new Builder()
    .forBrowser('firefox')
    .build();

;(function testPraise(){
    driver.get('http://localhost:8888');
    setTimeout(()=>{
        const box = driver.findElement(By.id('box'));
        let i = 0;
        const timer = setInterval(()=>{
            if(i == 10){
                clearInterval(timer);
                console.log("Done")
                driver.quit();
                return;
            }
            console.log(i)
            i++;
            box.click();
        },1000)
    },5000)
})();