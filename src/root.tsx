import { renderRoutes } from 'react-router-config'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import routes from './router'

const RouterComponent = (): JSX.Element => renderRoutes(routes)

setConfig({ logLevel: 'debug' })

// 创建该组件的目的是保证热更新之后store数据能够保持，如果把这一小部分代码放到app.tsx，则每次热更新会导致app.tsx更新相当于重新调用configureStore，所以store丢失，而把hot放置到Index.tsx，在app.tsx放置{renderRoutes(routes)}，则热更新会直接失败，因为只有Index.tsx被hot包裹了，其它组件没有
const Root = hot(RouterComponent)

export default Root
