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

export default CONFIG;
