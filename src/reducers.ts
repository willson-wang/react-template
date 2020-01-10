import { combineReducers, Reducer, ReducersMapObject } from 'redux'
import types from './constants'
import produce from 'immer'
import reducerGeneragtor from './utils/reducerGenerator'

interface IState {
    num: number
}

const initState: IState = {
    num: 0
}

interface Act {
    type: string
    num: number
}

// const Count = (state = initState, action: Act): IState => {
//     switch (action.type) {
//         case types.INCREASE:
//             return {
//                 ...state,
//                 num: action.num
//             }
//         case types.DECREASE:
//             return {
//                 ...state,
//                 num: action.num
//             }
//         default:
//             return state
//     }
// }

interface AppActionsHadlers {
    [key: string]: any
}

// 避免写重读的swicth case
const actionsHandler: AppActionsHadlers = {
    [types.INCREASE](state: IState, action: Act) {
        return produce(state, (draft) => {
            draft.num = action.num
        })
    },
    [types.DECREASE](state: IState, action: Act) {
        return produce(state, (draft) => {
            draft.num = action.num
        })
    }
}
console.log('xxx 000')
const Count = reducerGeneragtor(initState, actionsHandler)

export const createReducer = (asyncReducer: ReducersMapObject = {}): Reducer<any> => {
    return combineReducers({
        app: Count,
        ...asyncReducer
    })
}

export default Count
