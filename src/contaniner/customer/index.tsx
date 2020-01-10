import React, { useState, useEffect } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { useInjectReducer } from '@utils/injectReducer'
import { useInjectSaga } from '@utils/injectSaga'
import reducer from './reducers'
import saga from './saga'
import { Customer as CustomerItem } from './constants'
import { RootStore } from '@/constants'
import * as Actions from './actions'

interface GlobalParams {
    from: string
    orgCode: string
    tenant_code: string
    token: string
}
interface HouseListParams extends GlobalParams {
    pageIndex: number
    cityId: string
    keyword: string
    pageSize: number
}

// interface IProps {
//     getHouseList: (options?: HouseListParams) => void
//     addCustomer: (options?: CustomerItem) => void
//     clearCustomer: () => void
//     removeCustomer: (options?: CustomerItem) => void
//     getGlobalConfig: (options?: GlobalParams) => void
//     num: number
//     customerList: CustomerItem[]
// }

interface OwnState {
    num: number
    customerList: CustomerItem[]
}

const mapStateToProps = (state: RootStore): OwnState => {
    console.log('customer state', state)
    return {
        num: state.app.num,
        customerList: typeof state.customer !== 'undefined' ? state.customer.customerList : []
    }
}

const mapDispatchToProps = (dispatch: Dispatch): Actions.ActionsMethodTypes => {
    return {
        ...bindActionCreators(Actions, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    route?: object
}

function Customer(props: Props): JSX.Element {
    useInjectReducer('customer', reducer)
    useInjectSaga('customer', saga)
    console.log('props', props)
    const [name, setName] = useState<string>('')
    const [decs, setDecs] = useState<string>('')
    useEffect(() => {
        console.log('xxx0')
        props.getHouseList({
            pageIndex: 1,
            cityId: '',
            keyword: '',
            pageSize: 20,
            from: 'b2c_h5',
            orgCode: 'hzzhongxadmin',
            tenant_code: 'hzzhongxadmin',
            token: 'cdkqqf1407307954'
        })
        console.log('xxx')
    }, [])

    const addCustomer = (): void => {
        props.addCustomer({
            name,
            decs
        })
    }
    const clearCustomer = (): void => {
        props.clearCustomer()
    }
    const removeCustomer = (item: CustomerItem): void => {
        props.removeCustomer(item)
    }
    const getConfig = (): void => {
        props.getGlobalConfig({
            from: 'b2c_h5',
            orgCode: 'hzzhongxadmin',
            tenant_code: 'hzzhongxadmin',
            token: 'cdkqqf1407307954'
        })
    }
    return (
        <div>
            <div onClick={getConfig}>获取配置</div>
            客户{props.num}
            <div>
                <div>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                </div>
                <div>
                    <textarea
                        value={decs}
                        onChange={(e) => setDecs(e.target.value)}
                        name="decs"
                        cols={30}
                        rows={10}
                    ></textarea>
                </div>
            </div>
            <div onClick={addCustomer}>增加 999</div>
            <div onClick={clearCustomer}>清空 fff</div>
            <ul>
                {props.customerList.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {
                                removeCustomer(item)
                            }}
                        >
                            <p>{item.name}</p>
                            <p>{item.decs}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default connector(Customer)
