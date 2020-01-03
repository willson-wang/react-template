### react最佳实践，自己搭建react开发环境

1. 配置webpack、dev、prod分包配置

2. webpack开发环境热更新

https://stackoverflow.com/questions/55263085/property-hot-does-not-exist-on-type-nodemodule-ts2339

使用webpack-dev-middleware + webpack-hot-middleware开启热更新

1.使用同一个compiler

```
const config = require('../scripts/webpack/webpack.dev.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'warn',
    silent: true,
    stats: 'errors-only'
  })

app.use(middleware);

app.use(webpackHotMiddleware(compiler))
```

2.webpack配置内添加热更新插件

```
entry: [
    'webpack-hot-middleware/client?name=mobile&reload=true'
]

new webpack.HotModuleReplacementPlugin()
```

弊端每次更新整个页面都进行了刷新

使用react-hot-loader进行热更新



3. babel配置

4. 配置typescript

5. 引入eslint+prettier+husky+lint-stated用于打造统一的代码格式与输出，提高代码质量

https://github.com/typescript-eslint/typescript-eslint/tree/master/docs/getting-started/linting

https://github.com/forthealllight/blog/issues/45

https://github.com/prettier/eslint-config-prettier#readme

https://stackoverflow.com/questions/56557988/eslint-in-vsc-not-working-for-ts-and-tsx-files

6. 引入react-router

使用react-router-config配置静态路由

7. 引入redux、react-redux进行状态管理


8. 引入immutable数据概念

9. 使用redux-saga进行异步请求

10. 引入antd-mobile作为基础组件

11. 使用jest做单元测试

12. 依据功能划分模块，结构如下所示


