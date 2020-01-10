import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Root from './root'
import configureStore from './utils/configureStore'
import './assets/index.less'

console.log('ReactDOM 000')

const MOUNT_NODE = document.getElementById('app')

const store = configureStore({})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </Provider>,
    MOUNT_NODE
)

// if (module.hot) {
//     module.hot.accept('./contaniner/index', () => {
//         console.log('444')
//         ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//         render()
//     })
// }
