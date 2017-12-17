import { Star } from "./main";
// 注册一个 x-praise 点赞组件
xtag.register("x-praise-cpy", {
  content: `
        <!-- 点赞的 HTML 页面 -->
        <section style="background-color:orange">
            <div class="main" id="box">
                <div class="finger"></div>
                <div class="finger"></div>
            </div>
        </section>
    `,
  lifecycle: {
    created() {
      console.warn("x-praise-coy has been created.")
    },
    inserted() {
      console.warn("x-praise-cpy has been inserted.")
      const box = document.querySelector("section");
      const palm = document.querySelector(".main");
      // 启用点赞功能
      new Star(box,palm,10)
    },
  },
  methods:{
    
  }
});