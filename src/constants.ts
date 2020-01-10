import { ReducersMapObject, Store } from 'redux'
// import typesGenerator from './utils/typesGenerator'
// import { IState } from './contaniner/customer/constants';
import { SagaIterator, Task } from 'redux-saga'

// const types = typesGenerator('app', `

// INCREASE
// DECREASE

// `)

export const INCREASE = 'app@INCREASE'
export const DECREASE = 'app@DECREASE'

export interface RootStore {
    app: {
        num: number
    }
    customer: import('./contaniner/customer/constants').IState
}

export interface IStore<T> extends Store<T> {
    runSaga?: (saga: (...args: any[]) => SagaIterator, ...args: any[]) => Task
    asyncReducers?: ReducersMapObject
    asyncSagas?: {
        [key: string]: {
            saga?: Generator
            task?: Task
        }
    }
}

export type IReducer = ReducersMapObject<RootStore>
export type ILoadedState = Partial<RootStore>
export type ILoadedReducer = Partial<IReducer>

export default {
    INCREASE,
    DECREASE
}
