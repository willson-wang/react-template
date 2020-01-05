import My from './loadable'
import UserInfo from './userInfo'

export default {
    path: '/my',
    component: My,
    routes: [
        {
            path: '/my/user_info',
            component: UserInfo
        }
    ]
}
