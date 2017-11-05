import Praise from "../src/main"

describe("测试点赞计数功能",() => {
    it("点赞次数少于10次的情况",() => {
        const ele = document.body;
        const maxCount = 10;
        const praise = new Praise(ele,ele,maxCount);
        for(let i = 0; i < 9; i++){
            const [firstVal,secondVal] = praise.count();
            expect(firstVal).toBe(0)
            expect(secondVal).toBe(1)
        }
    })

    it("点赞次数等于10次的情况",() => {
        const ele = document.body;
        const maxCount = 10;
        const praise = new Praise(ele,ele,maxCount);
        for(let i = 0; i < 9; i++){
            praise.count();
        }
        const [firstVal,secondVal] = praise.count();
        expect(firstVal).toBe(1)
        expect(secondVal).toBe(1)
    })
})