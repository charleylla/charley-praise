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