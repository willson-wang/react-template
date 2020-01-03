import React from 'react'
import ReactDOM from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader';
import routes from './router'

const RouterComponent = () => renderRoutes(routes)

setConfig({ logLevel: 'debug' });
const Root = hot(RouterComponent)

console.log('ReactDOM', routes)

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>,
    MOUNT_NODE
)


// if (module.hot) {
//     module.hot.accept('./contaniner/index', () => {
//         console.log('444')
//         ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//         render()
//     })
// }
