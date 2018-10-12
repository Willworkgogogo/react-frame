const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs') // 在内存中读写文件
const ReactDomServer = require('react-dom/server')
const bootstrap = require('react-async-bootstrapper')
const proxy = require('http-proxy-middleware') // express http中间件
const serverConfig = require('../../build/webpack.config.server')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').default

// 1. 获取模板文件
// getTemplate 从前台开发环境获取模板
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// const Module = module.constructor
const NativeModule = require('module')
const vm = require('vm')

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

// 2. 读取webpack.config.server.js配置文件里的输出文件-->从内存中读取，加快开发阶段编译速度
const mfs = new MemoryFs()
const serverCompiler = webpack(serverConfig) // 生成webpackCompiler，通过watch方法监听entry入口文件的实时变化
serverCompiler.outputFileSystem = mfs
let serverBundle, createStoreMap// 存储打包后的模块内容
// 监测入口文件的变化，实时打包
serverCompiler.watch({}, (err, stats) => {
  // stats webpack打包之后输出的内容
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf-8') // 注意：读出来的内容是Buffer格式，并不符合模块内容的定义 -->

  // let m = new Module()
  // m._compile(bundle, 'server-entry.js') // 利用webpack的compile将Buffer内容编译 // 注意指定文件名，内存中存储需要
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = function(app) {
  // 将静态资源代理到客户端服务上
  app.use('/public', proxy({target: 'http://localhost:8888'}))

  app.get('*', function(req, res) {

      getTemplate().then(template => {
        const routerContext = {}
        const stores = createStoreMap()
        const app = serverBundle(stores, routerContext, req.url)

        bootstrap(app).then(() => {
          if (routerContext.url) {
            res.status(302).setHeader('Location', routerContext.url)
            res.end()
            return
          }
          
        const state = getStoreState(stores)

        const content = ReactDomServer.renderToString(app)

        const helmet = Helmet.rewind()

        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state),
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          style: helmet.style.toString(),
          link: helmet.link.toString()
        })

        res.send(html)

        // res.send(template.replace('<!-- app -->', content))
      })
    })
    .catch(err=>{console.log(err)})
  })
}
