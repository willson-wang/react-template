import React from 'react'
import { useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

interface IRoutes {
    path?: string
    component?: React.ComponentType
    routes?: []
}

interface IProps {
    route: {
        [key: string]: IRoutes[]
    }
}

function My(props: IProps): JSX.Element {
    const history = useHistory()
    console.log('my props', props)
    return (
        <div onClick={() => history.push({ pathname: '/my/user_info', state: { name: 'wangks' } })}>
            我的
            {renderRoutes(props.route.routes)}
        </div>
    )
}

export default My
