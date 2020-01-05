import Index from './contaniner/index'
import Home from './contaniner/home/loadable'
import HomeRoute from './contaniner/home/router'
import MyRoute from './contaniner/my/router'
import CustomerRoute from './contaniner/customer/router'
import LoginRoute from './contaniner/login/router'

// const otherRoutesMap = require.context('./contaniner', true, /router.ts$/)

// const otherRoutes = otherRoutesMap.keys().map((path) => {
//     console.log('file', path)
//     return path.split('/')[1]
// })

// console.log('otherRoutes', otherRoutes, otherRoutesMap)

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

export default routes
