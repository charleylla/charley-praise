describe("点赞功能单元测试",() => {
    it("测试点赞计数功能（正常情况）",() => {
        const { count } = Praise;
        expect(count()).toBe(true);
    })

    it("测试点赞计数功能（超出次数情况）",() => {
        const { count } = Praise;
        for(let i = 0; i < 10; i++){
            count();
        }
        expect(count()).toBe(false)
    })
});