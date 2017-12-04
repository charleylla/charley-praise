const path = require("path")
const webpack = require("webpack")
// 引入 webpack-livereload-plugin 插件
const LiveReloadPlugin = require("webpack-livereload-plugin");
// 引入 extract-text-webpack-plugin 插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 引入 html-webpack-plugin 插件
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 入口文件
    entry: {
        tags: [
            path.resolve(__dirname, "../src/public/js/tags.js")
        ]
    },
    // 输出的路径
    output: {
        filename: "public/js/[name]-[hash:16].js",
        // 该路径可看作是所有 output 的模板位置，最好写一个目录，而不是具体的 js 文件目录
        // 这个目录是整体意义上的
        path: path.resolve(__dirname, "../build")
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
        })
    ],
}