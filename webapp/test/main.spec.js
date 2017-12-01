// 引入 Praise 类,用来单元测试
import Praise from "../src/js/main"

describe("测试点赞计数功能",() => {
    // 这里进行单元测试,实际上是测试 Praise 对象上的 count 方法
    it("点赞次数少于10次的情况",() => {
        /**
         * 点赞是需要传入 HTML 元素的
         * 由于我们使用的是 Jasmine + PhantomJS 进行测试
         * 并且元素本身和 count 方法的功能无关,因此传入两个任意的元素
         */
        const ele = document.body;
        // 定义点赞的最大次数
        const maxCount = 10;
        const praise = new Praise(ele,ele,maxCount);
        for(let i = 0; i < 9; i++){
            const flag = praise.count();
            // 通过 expect 方法和 toBe 方法来进行单元测试的判断
            // 对于单元测试的代码，最好有一个返回值
            expect(flag).toBe(true)
        }
    })

    it("点赞次数等于10次的情况",() => {
        const ele = document.body;
        const maxCount = 10;
        const praise = new Praise(ele,ele,maxCount);
        for(let i = 0; i < 9; i++){
            praise.count();
        }
        const flag = praise.count();
        expect(flag).toBe(false)
    })
})

// 以下为原始代码
// describe("测试点赞计数功能",() => {
//     // 这里进行单元测试,实际上是测试 Praise 对象上的 count 方法
//     it("点赞次数少于10次的情况",() => {
//         /**
//          * 点赞是需要传入 HTML 元素的
//          * 由于我们使用的是 Jasmine + PhantomJS 进行测试
//          * 并且元素本身和 count 方法的功能无关,因此传入两个任意的元素
//          */
//         const ele = document.body;
//         // 定义点赞的最大次数
//         const maxCount = 10;
//         const praise = new Praise(ele,ele,maxCount);
//         /**
//          * 同前面在 main.js 中的注释，+1 的动画是任何时候都会触发的
//          * 因此返回一个数组是多余的
//          * 
//          * 如果要修改的话，可以直接对 _praiseCount 属性进行操作，这里检测
//          * 也只用电测 _praiseCount 属性的值就可以了，
//          */
//         for(let i = 0; i < 9; i++){
//             const [firstVal,secondVal] = praise.count();
//             // 通过 expect 方法和 toBe 方法来进行单元测试的判断
//             // 对于单元测试的代码，最好有一个返回值
//             expect(firstVal).toBe(0)
//             expect(secondVal).toBe(1)
//         }
//     })

//     it("点赞次数等于10次的情况",() => {
//         const ele = document.body;
//         const maxCount = 10;
//         const praise = new Praise(ele,ele,maxCount);
//         for(let i = 0; i < 9; i++){
//             praise.count();
//         }
//         const [firstVal,secondVal] = praise.count();
//         expect(firstVal).toBe(1)
//         expect(secondVal).toBe(1)
//     })
// })