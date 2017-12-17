// 引入 IndexModel
import IndexModel from "../model/indexModel";

const index = {
    index(){
        // 返回一个路由方法，可供 InitController 使用
        return async(ctx,next) => {
            // 渲染 index.html 页面
            // 要使用 render 方法，需要使用 koa-swig 中间件
            ctx.body = await ctx.render("index.html",{
                title:"来点个赞吧！"
            })
        }
    },
    update(){
        return async(ctx,next) => {
            // 新建实例对象
            const indexModel = new IndexModel();
            // 等待数据获取
            ctx.body = await indexModel.update();
        }
    },
    praise(){
        return async(ctx,next) => {
            // 这里需要进行请求头的判断
            // 如果直接渲染标签，在刷新浏览器后是空白的
            // 因此要根据是否是 Pjax 请求决定返回整个页面还是标签
            if(ctx.request.header["x-pjax"]){
                ctx.body = "<x-praise></x-praise>"
            }else{
                ctx.body = await ctx.render("index.html")
            }
        }
    },
    praiseCpy(){
        return async(ctx,next) => {
            if(ctx.request.header["x-pjax"]){
                ctx.body = "<x-praise-cpy></x-praise-cpy>"
            }else{
                ctx.body = await ctx.render("star.html")
            }
        }
    },
    media(){
        return async(ctx,next) => {
            ctx.body = "<div style='height:150px;width:100%;background:blue'>大幅广告。。。</div>"
        }
    }
}

export default index;