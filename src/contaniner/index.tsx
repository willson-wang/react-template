import React from 'react'
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
    console.log('props', props)
    return (
        <div>
            {renderRoutes(props.route.routes, { someProp: 'these extra props are' })}
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
