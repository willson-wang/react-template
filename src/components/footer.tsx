import React from 'react'
import { useHistory } from 'react-router-dom'

function Footer(): JSX.Element {
    const history = useHistory()
    const goTo = function(routeName: string): void {
        history.push({
            pathname: routeName
        })
    }
    return (
        <ul>
            <li onClick={() => goTo('/home')}>首页</li>
            <li onClick={() => goTo('/customer')}>客户</li>
            <li onClick={() => goTo('/my')}>我的</li>
            <li onClick={() => goTo('/login')}>登录</li>
        </ul>
    )
}

export default Footer
