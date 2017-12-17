// 配置文件
import path from "path";
const CONFIG = new Map();

// 定义端口
CONFIG.set("PORT",3000);
// 定义 views 路径
CONFIG.set("VIEWS_DIR",path.resolve(__dirname,"../views"));
// 定义静态资源路径
// 原始路径
// CONFIG.set("PUBLIC_DIR",path.resolve(__dirname,"../public"));
CONFIG.set("PUBLIC_DIR",path.resolve(__dirname,"../"));
/**
 * 为什么这里需要修改路径呢？
 * 这是因为我们在使用 webpack 进行编译的时候，将静态资源的目录设置为 build：
 *      path: path.resolve(__dirname, "../build")
 * 生成的 js 和 css 文件路径如下：
 *      filename: "public/js/[name]-[hash:16].js"
 *      public/css/main-[hash:16].css
 * 这些生成的文件都是以 build 为基准，存放在 public 目录中的，而自动生成的 HTML 文件是这样插入 js 的：
 *      <script type='text/javascript' src='../public/js/tags-8eb2e455ac139462.js'></script>
 * 这里需要注意的是，使用 koa-static 提供静态资源服务时，要引用静态资源，无需加上静态资源的目录，如：
 *      引用 public 下的 tag.js：
 *          src="js/tag.js"
 * 因此，如果将静态资源目录再设置为 public，那么通过
 *      <script type='text/javascript' src='../public/js/tags-8eb2e455ac139462.js'></script>
 * 这种方式引用会找不到文件
 * 因此，需要将静态资源目录设置为 public 的上一层，也就是 build。
 * 
 * 但是，这仍然会有一个问题，
 * 当我们把静态资源目录设置为 build 时，build 中所有的后端代码都被暴露了
 * 这就需要对 webpack 的配置再进行一些修改了      
 * 
 */

export default CONFIG;
