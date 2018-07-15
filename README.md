## 说明
这是一个React项目的架构，主要理清项目目录的设置，构建工具的配置，服务端渲染的配置。

## 启动
```shell
npm run start # 启动项目
```


## 项目目录
```shell
build/              # webpack配置文件，工程脚本文件
client/             # 应用文件
dist/               # 编译后文件
node_modules/       # npm包存储
server/             # 存放后台服务文件
  -- server.js      # 路由、服务、静态文件路径映射

```

## Issue
1.执行webpack-dev-server报错
> throw new Error('invalid "instanceof" keyword value ' + c);

webpack-dev-server的[Issue](https://github.com/webpack/webpack-dev-server/issues/1355)里有关于这个的讨论, 暂时采取了其中的一个方法，降级webpack-dev-server版本到2.9.1

