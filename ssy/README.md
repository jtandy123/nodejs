Node.js本质是单线程的  
异步的非阻塞的底层架构

node可以作为前后端的中间层，进行路由和转发  

知识点：
- node包管理工具：npm, yarn  
- node版本管理：nvm
- node事件与回调机制
- node异步IO模型
- node的单线程模型
- node内置模块
- package.json
- 全局安装与局部安装方式
- npm scripts
- node异步编程
- node流分析
- 输入与输出：同步和异步的输入输出
- node网络功能
- node的控制台
- 事件循环机制
- node调试
- exports对象
- node操纵文件系统
- Buffer
- node错误处理模型
- node访问MongoDB
- node访问MySQL
- node访问Redis
- 中间件
- node web服务器详解
- node中的WebSocket
- WebSocket数据传输
- SocketIO：node长连接处理
- web框架：express & koa2
---   

nvm常用命令：
```
$ command -v nvm
$ nvm ls
$ nvm ls-remote
$ nvm install xxx
$ nvm use xxx
```
---
- 依靠事件循环机制对请求进行处理
- 异步和回调
- 处理客户请求的主线程是单线程
---
常用网络模块：
- http: 创建服务器和客户端
- url
- querystring