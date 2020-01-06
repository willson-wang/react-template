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

https://github.com/gaearon/react-hot-loader/issues/1227


3. 统一browserlist设置，建立.browserslistrc

last 3 major versions, > 0.1%  浏览器最新的三个主版本及浏览器份额大于0.1%，这个场景已经覆盖了Global coverage:96.2%

如下图所示


查看具体的浏览器份额https://browserl.ist/

3. babel配置



4. 配置typescript

https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets

https://medium.com/@xfor/typescript-react-hocs-context-api-cb46da611f12

https://github.com/TypeStrong/atom-typescript/issues/1053

5. 引入eslint+prettier+husky+lint-stated用于打造统一的代码格式与输出，提高代码质量

开启eslint

yarn add eslint --dev

这里如果不想使用standard or arinb的eslint规则，则不需要安装其它插件

新建.eslintrc.js

```
module.exports = {
    "extends": ['eslint:recommended'] or eslint:all 使用eslint官网推荐的规则
}
```

本项目使用standard,因为'eslint:recommended'校验规则过少，eslint:all校验规则又过多

```
yarn add --dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node

module.exports = {
    "extends": ['standard']
}
```

开启typescript的eslint检查

```
yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev

修改.eslintrc.js

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'standard',
    'plugin:@typescript-eslint/eslint-recommended', // 禁用一些TypeScript's typechecker定义的规则
    'plugin:@typescript-eslint/recommended', // ts的推荐配置
  ],
};
```

因为我们之前选用的standard,所以选择已经跟standard结合的规则包eslint-config-standard-with-typescript

```
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
-     'eslint:recommended',
-     'plugin:@typescript-eslint/eslint-recommended',
-     'plugin:@typescript-eslint/recommended',
+     'standard-with-typescript',
    ],
    "parserOptions": {
        "project": "./tsconfig.json" // 添加project属性，避免typescript-eslint/no-floating-promises':报错
    },
  };
```

接下来添加react及react-hooks eslint

```
yarn add eslint-plugin-react eslint-plugin-react-hooks --dev

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-hooks'
  ],
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
};
```

最后我们需要使用prettier来进行格式化代码，使用需要把prettier的规则跟eslint做合并处理

我们可以通过eslint-config-prettier来进行配置，注意该包包含了很多跟其它插件覆盖的规则，如下所示

```
{
  "extends": [
    "some-other-config-you-use",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/babel",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard",
    "prettier/unicorn",
    "prettier/vue"
]
```

我们这里先不用，等实际进行prettier格式化代码之后在具体覆盖某条规则

需要去掉"parser": "babel",选项避免不能自动识别

https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md

https://github.com/typescript-eslint/typescript-eslint/tree/master/docs/getting-started/linting

https://github.com/forthealllight/blog/issues/45

https://github.com/prettier/eslint-config-prettier#readme

https://stackoverflow.com/questions/56557988/eslint-in-vsc-not-working-for-ts-and-tsx-files

https://github.com/yannickcr/eslint-plugin-react

https://github.com/prettier/eslint-config-prettier

https://github.com/prettier/prettier/issues/4633

6. 引入react-router

使用react-router-config配置静态路由,如下所示





7. 使用css module + less来书写样式

```
{
    test: /\.css$/,
    exclude: /(node_module|\.module.css$)/,
    use: [
        'style-loader', 
        'css-loader',
        'postcss-loader'
    ]
},
{
    test: /\.module\.css$/,
    exclude: /node_module/,
    use: [
        'style-loader', 
        {
            loader: 'css-loader',
            options: {
                modules: true, 
                importLoaders: 1
            }
        }, 
        'postcss-loader'
    ]
},
```

less css预处理器

postcss css解析器，将css解析成ast，然后在通过postcss插件来处理生成后的ast，然后最终在生成css

```
.postcss.config.js配置如下所示

module.exports = ({file, env}) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        'cssnano': env === 'production' ? {} : false
    }
})
```

postcss-import: 
支持@import导入css

postcss-preset-env: {}

将现代CSS转换成浏览器可以理解的样式，可以理解成@babel/preset-env一样的插件
会根据browserslist来进行autoprefixer
会根据stage参数来选择当前处理第几阶段的css新语法

cssnano: {}
删除空格和最后一个分号
删除注释
优化字体权重
丢弃重复的样式规则
优化calc()
压缩选择器
减少手写属性
合并规则

在线autoprefixer站点https://autoprefixer.github.io/

8. 引入stylelint对css进行代码检查

```
yarn add stylelint stylelint-config-standard --dev

场景.stylelintrc

{
    "extends": "stylelint-config-standard",
    rules: {
        indentation: 4
    }
}
```

两种使用方式

1. 借助webpack及postcss在代码编译的时候进行检查

```
plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': env === 'production' ? {} : false,
    'stylelint': {} // 在这里添加stylelint选项
}
```

2. 使用scripts命令来进行检查及修复

```
"css:lint": "stylelint src/**/*.css src/**/*.less",
"css:fix": "stylelint src/**/*.css src/**/*.less --fix"
```

7. 引入redux、react-redux进行状态管理


8. 引入immutable数据概念

9. 使用redux-saga进行异步请求

10. 引入antd-mobile作为基础组件

11. 使用jest做单元测试

12. 依据功能划分模块，结构如下所示


