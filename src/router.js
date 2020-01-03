
import Index from './contaniner/index'
import My from './contaniner/my/loadable'
import UserInfo from './contaniner/my/userInfo'
import Customer from './contaniner/customer/loadable'
import Home from './contaniner/home/loadable'
import Login from './contaniner/login/loadable'

const routes = [
    {
        component: Index,
        routes: [
            {
                path: "/",
                exact: true,
                component: Home,
            },
            {
                path: "/home",
                component: Home,
            },
            {
                path: "/my",
                component: My,
                routes: [
                    {
                        path: "/my/user_info",
                        component: UserInfo
                    }
                ]
            },
            {
                path: "/customer",
                component: Customer
            },
            {
                path: "/login",
                component: Login
            },
            {
                path: '*',
                component: Home
            }
        ]
    }
]

export default routes