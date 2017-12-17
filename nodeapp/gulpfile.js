// 引入 gulp 和 babel
const gulp = require("gulp")
const babel = require("gulp-babel")

// 创建一个 HandleJS 任务
gulp.task("HandleJS",() => {
    // 选择目标文件，这里选择 .js 结尾的文件
    // 在项目中，最好将源文件放在 src 文件夹中，方便开发和使用 gulp 之类的工具进行编译
    // 注意，该任务只会处理 .js 文件，而无法处理其他类型的文件
    // 这里只对 Node 的代码进行处理，不处理前端的 JS 代码
    gulp.src(["./src/**/*.js","!./src/public/*.js"])
        .pipe(babel({
            // 由于我们使用了 babel-preset-env 插件，这里还需要针对 async/await 语法进行一些配置
            presets:[
                [
                    "env",
                    {
                        "targets":{
                            "browsers": ["last 2 Chrome versions"]
                        }
                    }
                ]
            ]
        }))
        .pipe(gulp.dest("./build"));
});

// // 创建 default 任务，在该任务中需要先执行 HandleJS 任务
// gulp.task("default",["HandleJS"],() => {
//     // 监控文件变化，实现自动编译
//     // 同样，这里对前端的代码不做监控
//     // 在文件发生变化后，执行 HandleJS 任务
//     gulp.watch(["./src/**/*.js","!./src/public/*.js"],["HandleJS"]);
// })

gulp.task("default",["HandleJS"]);