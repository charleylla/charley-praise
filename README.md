# Charley Praise
## 特性
- 前后端分离
- 使用 Node 做中间层
- 后端使用 PHP

## 说明
每次点击向 Node 中间层发起请求，中间层向更后端的 PHP 发起请求，最终写入数据库。

PHP 分了 DAO 层和具体的业务层，只有两个文件，由于我多 PHP 不是很熟练，因此写得比较简单。

## 文件夹划分
- nodeapp：Node 中间层
- server：后端 PHP 服务
- webapp：前端应用

## 单元测试
- nodeapp：使用 mocha + request 进行接口测试。
- webapp：1）使用 karam + jasmine 进行单元测试，并生成代码覆盖率报告。2）使用 selenium-webdriver 进行用户行为测试。
- server：无。

## nodeapp 目录说明
- config：配置文件
- controller：控制器，定义路由
- model：模型层，定义接口以及请求后端接口
- test：测试
- middleware：中间件

## webapp 目录说明
- build：存放使用 babel 构建后的 js 和 sourcemap 文件
- coverage：代码覆盖率报告
- pic：项目中用到的 UI 图
- src：项目原始文件
- test：测试

## server 目录说明
- DAO.php：封装统一的数据请求接口
- praise.php：点在的业务逻辑

