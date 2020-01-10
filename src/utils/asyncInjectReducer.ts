import { Reducer } from 'redux'
import { createReducer } from '../reducers'
import { ILoadedState, IStore } from '../constants'

const asyncInjectReducer = <T>(
    store: IStore<T>,
    key: string,
    reducer: Reducer<ILoadedState>
): void => {
    if (Reflect.has(store.asyncReducers, key) && store.asyncReducers[key] === reducer) {
        return
    }
    store.asyncReducers[key] = reducer
    store.replaceReducer(createReducer(store.asyncReducers))
}

export default asyncInjectReducer
