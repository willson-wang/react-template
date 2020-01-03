import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { renderRoutes } from "react-router-config";
import Footer from '../components/footer'

console.log('aaaa 0000')
const debounce = function debounce(fn, time) {
    let timer;
    return function inner(...args) {
      console.log('timer', timer)
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('xxxx')
        fn(...args);
      }, time);
    };
};

function Index (props) {
    const [count, setCount] = useState(0);
    const history = useHistory()
    const newCount = debounce(setCount, 1000)
    const getHouseList = async () => {
        const data = await axios.get('/api/broker/index/get-building-list', {
            params: {
                pageIndex: 1,
                cityId: '',
                keyword: '',
                pageSize: 20,
                from: 'b2c_h5',
                orgCode: 'hzzhongxadmin',
                tenant_code: 'hzzhongxadmin',
                token: 'cdkqqf1407307954',
            }
        })
        console.log('data', data)
    }
    console.log('props',  props)
    useEffect(() => {
        console.log('getList')
        getHouseList()
    }, [])
    return (
        <div>
            {renderRoutes(props.route.routes, { someProp: "these extra props are optional" })}
            <Footer />
        </div>
    );
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