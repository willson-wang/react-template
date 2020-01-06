import React, { useEffect } from 'react'
import axios from 'axios'
import { renderRoutes } from 'react-router-config'
import Footer from '../components/footer'

interface IRoutes {
    path?: string
    component?: React.ComponentType
    routes?: []
}

interface IProps {
    history: object
    route: {
        [key: string]: IRoutes[]
    }
}

console.log('aaaa 0000')

function Index(props: IProps): JSX.Element {
    const getHouseList = async (): Promise<object> => {
        const data = await axios.get('/api/broker/index/get-building-list', {
            params: {
                pageIndex: 1,
                cityId: '',
                keyword: '',
                pageSize: 20,
                from: 'b2c_h5',
                orgCode: 'hzzhongxadmin',
                tenant_code: 'hzzhongxadmin',
                token: 'cdkqqf1407307954'
            }
        })
        console.log('data', data)
        return data
    }
    console.log('props', props)
    useEffect(() => {
        console.log('getList')
        getHouseList()
            .then(() => {
                console.log('true')
            })
            .catch((err) => {
                console.log('err', err)
            })
    }, [])
    return (
        <div>
            {renderRoutes(props.route.routes, { someProp: 'these extra props are optional' })}
            <Footer />
        </div>
    )
}

// const Index = () => (
//     <div>
//       <h1>Hello, world.</ h1>
//     </div>
// )

// class Index extends React.Component {
//     componentDidMount() {
//         console.log('mounted')
//     }

//     render() {
//         console.log('xxxx')
//         return (
//             <div>
//                 {renderRoutes(this.props.route.routes, { someProp: "these extra props are optional" })}
//                 <Footer />
//             </div>
//         )
//     }
// }

export default Index
