# 服务端渲染

> SSR：service side rendering 服务端渲染

## 流程
1. client/server-entry.js 服务端渲染内容导出
1. build/webpack.config.server.js 通过webpack编译react文件，符合服务端代码规范，即编译成commonjs2
1. 