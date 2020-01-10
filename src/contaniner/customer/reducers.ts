import produce from 'immer'
import types, {
    IState,
    AddCustomerAction,
    RemoveCustomerAction,
    GetHouseListSuccAction,
    GetGlobalConfigSuccAction
} from './constants'
import reducerGeneragtor from '../../utils/reducerGenerator'

const initState: IState = {
    customerList: [],
    houseList: [],
    total: 0,
    globalConfig: {}
}

// const Customer2 = (state = initState, action: CustomerActionTypes): IState => {
//     switch (action.type) {
//         case types.ADD_CUSTOMER:
//             return {
//                 ...state,
//                 customerList: state.customerList.concat(action.customer)
//             }
//         case types.REMOVE_CUSTOMER:
//             const index = state.customerList.findIndex(action.customer)
//             return {
//                 ...state,
//                 customerList: state.customerList.split(index, 1)
//             }
//         case types.CLEAR_CUTOMER:
//             return {
//                 ...state,
//                 customerList: []
//             }
//         default:
//             return state
//     }
// }

interface CustomerActionsHadlers {
    [key: string]: any
}

const actionsHandlers: CustomerActionsHadlers = {
    [types.ADD_CUSTOMER](state: IState, action: AddCustomerAction) {
        // 使用CustomerActionTypes接口报错
        return produce(state, (draft) => {
            draft.customerList = state.customerList.concat(action.customer)
        })
    },
    [types.REMOVE_CUSTOMER](state: IState, action: RemoveCustomerAction) {
        console.log('state', state)
        const index = state.customerList.findIndex((item) => action.customer)
        return produce(state, (draft) => {
            draft.customerList.splice(index + 1, 1)
        })
    },
    [types.CLEAR_CUTOMER](state: IState) {
        return produce(state, (draft) => {
            draft.customerList = []
        })
    },
    [types.GET_HOUSE_LIST_SUCC](state: IState, action: GetHouseListSuccAction) {
        return produce(state, (draft) => {
            draft.houseList = action.houseList
            draft.total = action.total
        })
    },
    [types.GET_GLOBAL_CONFIG_SUCC](state: IState, action: GetGlobalConfigSuccAction) {
        return produce(state, (draft) => {
            draft.globalConfig = action.globalConfig
        })
    }
}

const Customer = reducerGeneragtor(initState, actionsHandlers)

export default Customer
