import React from 'react'
import { useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

function My (props) {
    const history = useHistory()
    console.log('my props', props)
    return (
        <div onClick={() => history.push({pathname: '/my/user_info', state: {name: 'wangks'}})}>我的
            {renderRoutes(props.route.routes)}
        </div>
    )
}

export default My