const path = require("path")
const webpack = require("webpack")
// 引入 webpack-livereload-plugin 插件
const LiveReloadPlugin = require("webpack-livereload-plugin");
// 引入 extract-text-webpack-plugin 插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 引入 html-webpack-plugin 插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入 webpack-manifest
const Manifest = require("webpack-manifest");
module.exports = {
    // 入口文件
    entry: {
        tags: [
            path.resolve(__dirname, "../src/public/js/tags.js"),
            path.resolve(__dirname, "../src/public/js/star.js")
        ],
    },
    // 输出的路径
    output: {
        filename: "public/js/[name]-[hash:16].js",
        // 该路径可看作是所有 output 的模板位置，最好写一个目录，而不是具体的 js 文件目录
        // 这个目录是整体意义上的
        path: path.resolve(__dirname, "../build"),
    },
    // 配置 loader
    module: {
        rules: [
            // 配置 babel-loader
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            },
            // 配置 css-loader，并提取出 css 文件
            {
                test: /\.css$/,
                // 抽取后会自动插入 css 到生成的 HTML 文件中
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        // 定义环境变量
        // 由于我们在 package.json 中使用 better-npm-run 定义了环境变量
        // 因此此处是不是需要再定义环境变量的
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: "dev"
        //     }
        // }),
        // 配置 LiveReloadPlugin 插件
        // 注：该插件依赖 livereload 浏览器插件
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        // 配置 ExtractTextPlugin 插件
        new ExtractTextPlugin("public/css/main-[hash:16].css"),
        // 抽取公共代码
        // 这些路径均已 output 的路径为基准
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "public/js/common/vendor-[hash:16].js",
        }),
        // 自动生成 HTML 文件
        // 自动生成 layout.html
        // 该插件的 template 路径是相对于 webpack.config.js 的路径
        // 将文件生成到 build/views 目录下
        // 模板的路径在 src/widget 目录下（我们要通过字符串拼接HTML）
        // 生成的文件会自动插入 js 文件
        new HTMLWebpackPlugin({
            filename: "./views/layout.html",
            template: "src/widget/layout.html",
            // layout 是模板文件，默认 layout 和 index 都会注入 js 和 css 文件
            // 这里我们不让 layout 注入这些文件
            inject:false,
        }),
        // 自动生成 index.html
        // 先使用 index.js 作为模板，是为了修正自动插入的 css 和 js 的位置
        // 在 views 中生成 index.html
        new HTMLWebpackPlugin({
            filename: "./views/index.html",
            template: "src/views/index.js",
            inject:false,
            chunks:["vendor","tags"]
        }),
        // 上面做了一些处理，会包含这个 index.html 的内容
        // 在 widget 中生成 index.html，这个 index,html 需要被上面的 views/index.html 进行包含（include）
        new HTMLWebpackPlugin({
            filename: "./widget/index.html",
            template: "src/widget/index.html",
            inject:false,
        }),
        new HTMLWebpackPlugin({
            filename: "./views/star.html",
            template: "src/views/star.js",
            inject:false,
            chunks:["vendor","tags"]
        }),
        new HTMLWebpackPlugin({
            filename: "./widget/star.html",
            template: "src/widget/star.html",
            inject:false,
        }),
        // 配置离线缓存
        new Manifest({
            cache: [
                // 配置缓存的文件
                "../public/js/common/vendor-[hash:16].js",
                "../public/js/tags-[hash:16].js",
                "../public/css/main-[hash:16].css"
            ],
            //Add time in comments. 
            timestamp: true,
            // 生成的文件名字，选填 
            // The generated file name, optional. 
            filename:"cache.manifest", 
            // 注意*星号前面用空格隔开 
            network: [
                // // 不缓存的文件 
                // // 不缓存 bootcdn
                // "https://cdn.bootcss.com/ *",
                // // 不缓存 livereload
                // "http://localhost:35729/ *"

                // 这里好像固定写有问题，提示找不到文件啥的（不支持 HTTPS？）
                // 因此我在这里禁止缓存所有域下的文件
                // 然后在 cache 中缓存用到的文件即可

                // 这时我们断开 NODE 服务，仍然会从 CDN 上获取文件
                // 此时再断网，哪些文件也就找不到了
                // 因此最好将第三方的库也缓存下来

                "*"
            ],
            // 注意中间用空格隔开 
            // fallback: ["/ /404.html"],
            // manifest 文件中添加注释 
            // Add notes to manifest file. 
            headcomment: "charley-praise", 
            master: ["index/index.html"]
        })
    ],
}