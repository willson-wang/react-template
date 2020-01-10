import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { IStore } from '../constants'
import { createReducer } from '../reducers'

// const allReducer = combineReducers({
//     app: rootReducer,
//     customer: customerReducer
// })

export default function configureStore<T>(preloadState: object): IStore<T> {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const store: IStore<T> = createStore(createReducer(), middlewareEnhancer)
    store.asyncReducers = {}
    store.asyncSagas = {}
    store.runSaga = sagaMiddleware.run

    // store.injectReducer = (key, reducer) => {
    //     store.asyncReducers[key] = reducer
    //     store.replaceReducer(createReducer(store.asyncReducers))
    // }
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            console.log('xxxx hot', store)
            store.replaceReducer(createReducer(store.asyncReducers))
        })
    }
    return store
}
