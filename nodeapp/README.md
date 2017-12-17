2017/12/17 新增
## 对点赞页面进行性能优化
## Features
- 新增 x-praise-cpy 组件
- 使用 PJAX 改造多页应用，做 SPA
- Node 配合 PJAX，实现完整的 SPA
- 配置 DNS 预解析
- 使用 LocalStorage 缓存 JS，提高页面性能
- 使用 IndexDB 存放广告图片，并采用 localForage 库实现 ORM，实现前端缓存的负载均衡
- 生成环境配置 CDN

2017/12/04 新增
## 引入 Web Components，并进行代码的工程化配置
## Features
- 使用 gulp 编译 Node 代码
- 使用 webpack 编译原 webapp 代码，区分开发和生产环境
- 使用 better-npm-run 做环境变量管理
- 引入 x-tags
- 去除 SystemJS，改用 webpack 自动加载模块
- 自动生成 HTML
- 更好的模板继承
- 对插入到自动生成的 HTML 的 css 和 js 文件进行处理，确保插入到正确的位置
- Node 项目区分开发环境和生产环境
- 将 test 目录移动到 src 目录下

## 新增命令
1.开发环境调试前端代码
```
npm run webpackdev
```
2.生产环境调试前端代码
```
npm run webpackprod
```
3.启用 gulp 持续化编译 Node 代码
```
npm run gulp
```
4.启动 node 服务
```
npm run start
```
## 架构分析
### 工程化构建
前端代码采用 webpack 进行构建，后端代码采用 gulp 进行构建。并区分了开发和生产环境。
将原始的目录进行了改进，将源码收入到 src 目录下，编译后的代码收入到 build 目录下，结构更为清晰。
### 前端工程化说明
1.去除 SystemJS 手动引用模块，改为自动生成 HTML 文件，并插入 css 和 js 代码

2.自动提取 css 文件，以及自动抽取公共 js 代码

3.新增了 widget 目录，在 src 目录中作为原始的 views 目录的功能，即提供模板文件

4.对原始的 views 目录进行修改，利用 widget 目录中的文件生成 HTML，并优化代码格式

5.编译后生成 build 目录，该目录下的 views 目录和之前的作用一样，模板文件从该目录下引用（区别于 src 目录，模板文件从 widget 中引用），具体可查看相应的 webpack 配置和其他相关文件。

----
## 使用 Node 做点赞功能的中间层
## Features
- 使用 ES6 语法
- 使用 Babel 编译 ES6
- 使用 koa2 作为中间层框架 
- 采用 MVC 模式进行视图分发和数据处理
- 使用 koa-simple-router 作为路由系统
- 使用 swig 继承原始 webapp 中的静态页面
- 使用 koa-static 提供静态资源服务
- 使用 koa-request 请求后端数据（PHP）
- 使用 supertest（mocha）做后端接口测试
- 将原 webapp 中的单元测试、e2e 测试迁移到 nodeapp 中
- 其他 webapp 中的功能
## 使用
启动服务器：
```
node app
```
单元测试：
```
npm run test
```
E2E 测试：
```
npm run e2e
```
接口测试：
```
npm run supertest
```
## 架构分析
### 1.使用 swig 将原始的 webapp 集成到 nodeapp中
通过 swig 模板引擎，我们将 webapp 中的资源（HTML，CSS，JS）集成到了 nodeapp 中，其中，HTML 集成到 nodeapp 的 ```views``` 目录下，CSS 和 JS 集成到了 nodeapp 的 ```public``` 目录下。
在 ```view``` 目录下，提供了一个模板文件 ```layout.html``` 和一个页面文件 ```index.html```。
### 2.使用 koa-static 提供静态资源服务
在项目使用了 ```koa-static``` 中间件以提供静态资源服务，静态资源文件夹就是 nodeapp 中的 ```public``` 文件夹。
### 3.MVC 架构
项目使用了 MVC 架构。在 ```controller``` 中进行路由分发（页面渲染或接口数据响应），在 ```model``` 中进行了数据处理，在 Node 作为中间层的场景下，我们没有直接操作数据库，而是从后端 PHP 中获取数据。在 ```views``` 中存放相关的视图文件，上面已有介绍。
### 4.测试
将原 webapp 中的单元测试、E2E 测试迁移到了 nodeapp 中，同时，在 nodeapp 中还进行了基于 mocha 和 supertest 的接口测试。
### 5.项目成果
通过一些迁移，我们实现了：
- 使用 Node 作为中间层，分发请求
- 使用 Node 进行页面渲染和静态资源处理
- 使用 Node 进行接口响应
- 前后端的单元测试