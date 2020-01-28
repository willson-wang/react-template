### React+Ts+Redux+Redux-Saga+Immutable，从0到1搭建环境

#### 一、 配置webpack

webpack开发环境热更新

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

React-Hot-Loader: some components were updated out-of-bound. Updating your app to reconcile the changes. 

提示上面这个警告是正常的，这是react-hot-loader为了保证异步加载的组件能够正常热更新，所以重新走了一次组件的流程

可以通过setConfig({ trackTailUpdates:false })取消

https://github.com/gaearon/react-hot-loader/issues/1227
https://stackoverflow.com/questions/55263085/property-hot-does-not-exist-on-type-nodemodule-ts2339

#### 二、 统一browserlist设置，建立.browserslistrc

last 3 major versions, > 0.1%  浏览器最新的三个主版本及浏览器份额大于0.1%，这个场景已经覆盖了Global coverage:96.2%

如下图所示

查看具体的浏览器份额 https://browserl.ist/

#### 三、 babel配置

- 按需polyfill
- 使用env预设来进行语法转化
- 引入runtime包减少重复代码
- 允许使用stage中的语法

配置如下

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {},
        "modules": false,
        "debug": false,
        "include": [],
        "exclude": [],
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "forceAllTransforms": false,
        "shippedProposals": true
      }
    ],
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
          // "pragma": "dom", // default pragma is React.createElement
          // "pragmaFrag": "DomFrag", // default is React.Fragment
          // "throwIfNamespace": false // defaults to true
      }
    ]
  ],
  "plugins": [ // Plugins run before Presets. ordering is first to last.Preset ordering is reversed (last to first).
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-class-properties",
    [
      "import",
      {
        "libraryName": "antd",
        "style": true   // or 'css'
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ],
    [
      "react-hot-loader/babel"
    ]
  ]
}
```

#### 四、 配置typescript

https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets

https://medium.com/@xfor/typescript-react-hocs-context-api-cb46da611f12

https://github.com/TypeStrong/atom-typescript/issues/1053

#### 五、 引入eslint+prettier+husky+lint-stated用于打造统一的代码格式与输出，提高代码质量

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

#### 六、 引入react-router

使用react-router-config配置静态路由,如下所示

```
const routes = [
    {
        component: Index,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            HomeRoute,
            MyRoute,
            CustomerRoute,
            LoginRoute,
            {
                path: '*',
                component: Home
            }
        ]
    }
]
```

#### 七、 使用css module + less来书写样式

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

postcss-import: 支持@import导入css

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

#### 八、 引入stylelint对css进行代码检查

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

#### 九、 引入redux、react-redux进行状态管理

通过configureStore.js来创建store的目的是，大多数应用程序使用多个中间件，并且每个中间件通常需要进行一些初始设置。
由于逻辑结构不够整洁，添加到index.js的额外噪声可能很快使其难以维护。

代码分割，所以我们需要使用replaceReducer来动态注册store

typescript + redux技巧
```
// 1. 使用type + typeof 来替换interface定义state的类型
const initialState = {
  name: '',
  points: 0,
  likesGames: true
}

type State = typeof initialState;

// 2. 使用ReturnType来推导Action的类型
export function updateName(name: string) {
  return {
    type: ‘UPDATE_NAME’,
    name
  }
}

type Action = ReturnType<typeof updateName> // {type: string, name: string} 无法推导出type的值

使用类型推断

export function updateName(name: string) {
  return {
    type: 'UPDATE_NAME',
    name
  } as const
}

type Action = ReturnType<typeof updateName> // {type: '‘UPDATE_NAME’', name: string} 无法推导出type的值

```
https://gist.github.com/schettino/c8bf5062ef99993ce32514807ffae849

#### 十、 引入immutable数据概念

熟悉 React 的都知道，React 做性能优化时有一个避免重复渲染的大招，就是使用 `shouldComponentUpdate()`，但它默认返回 `true`，即始终会执行 `render()` 方法，然后做 Virtual DOM 比较，并得出是否需要做真实 DOM 更新，这里往往会带来很多无必要的渲染并成为性能瓶颈。

当然我们也可以在 `shouldComponentUpdate()` 中使用使用 deepCopy 和 deepCompare 来避免无必要的 `render()`，但 deepCopy 和 deepCompare 一般都是非常耗性能的。

Immutable 则提供了简洁高效的判断数据是否变化的方法，只需 `===` 和 `is` 比较就能知道是否需要执行 `render()`，而这个操作几乎 0 成本，所以可以极大提高性能

相对于immutable学习成本，选用immer来替换immutable

https://zhuanlan.zhihu.com/p/20295971
https://immerjs.github.io/immer/docs/introduction

#### 十一、 使用redux-saga进行异步请求管理

```
import { call, all, takeLatest, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { get } from '@utils/fetch'
import types, { House } from './constants'

const houseListUrl = '/api/broker/index/get-building-list'
const configUrl = '/api/site/global-setting'

interface HouseListData {
    total: number
    data: House[]
}

export function* getHouseList(params: object): SagaIterator {
    console.log('params', params)
    try {
        // saga里面只能使用这种方式，不能在get、post等方法传入范型约束
        const result: HouseListData = yield call(get, houseListUrl, params)
        yield put({
            type: types.GET_HOUSE_LIST_SUCC,
            houseList: result.data,
            total: result.total
        })
    } catch (error) {
        console.log('error', error)
    }
}

export function* getGlobalConfig(params: object): SagaIterator {
    try {
        const result = yield call(get, configUrl, params)
        console.log('result', result)
        yield put({
            type: types.GET_GLOBAL_CONFIG_SUCC,
            globalConfig: result
        })
    } catch (error) {
        console.log('error', error)
    }
}

export default function* root(): SagaIterator {
    yield all([
        takeLatest(types.GET_HOUSE_LIST, getHouseList),
        takeLatest(types.GET_GLOBAL_CONFIG, getGlobalConfig)
    ])
}

```
https://redux-saga.js.org/
https://redux-saga-in-chinese.js.org/

#### 十二、 引入antd-mobile作为基础组件

- 使用babel-plugin-import按需加载被使用的组件
- 使用antd-dayjs-webpack-plugin插件Day.js 替换 momentjs 优化打包大小 

#### 十三、 使用jest做单元测试

#### 十四、 依据功能划分目录，结构如下所示

```
    |-- .editorconfig
    |-- .git
    |-- .gitignore
    |-- server
        |-- argv.js
        |-- index.js
        |-- port.js
        |-- proxy.js
        |-- runOpen.js
    |-- script
        |-- webpack
            | -- webpack.config.js
            | -- webpack.dev.config.js
            | -- webpack.prod.config.js
        |-- outputDir.js
    |-- .babelrc
    |-- .browserslistrc
    |-- .eslintignore
    |-- .eslint.js
    |-- .prettierrc
    |-- .stylelintrc
    |-- .index.html
    |-- .postcss.config.js
    |-- .tsconfig.json
    |-- node_modules
    |-- package.json
    |-- src
        |-- assets  // 
            |-- index.less
        |-- common  // 
            |-- schemas
        |-- components  // 
            |-- footer.ts
        |-- contaniner  //
            |-- home
               |-- actions //  
               |-- constants //  
               |-- index.module.css //  
               |-- index.tsx //  
               |-- loadable.tsx //  
               |-- reducers.ts //  
               |-- router.ts //  
               |-- saga.ts // 
        |-- utils  // 
        |-- actions.ts  // 
        |-- app.tsx  // 
        |-- constants.tsx  // 
        |-- global.d.ts  // 
        |-- reducer.tsx  // 
        |-- root.tsx  // 
        |-- router.ts  // 
```


参考链接
https://stackoverflow.com/questions/35517245/error-missing-class-properties-transform
https://medium.com/@jrwebdev/react-render-props-in-typescript-b561b00bc67c
https://codeburst.io/dynamic-imports-react-and-redux-29f6d2d88d77


