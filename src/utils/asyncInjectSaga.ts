import { IStore } from '../constants'

interface Descriptor {
    saga: any
}

export const injectSaga = <T>(
    store: IStore<T>,
    key: string,
    descriptor: Descriptor,
    args?: any
): void => {
    const { saga } = descriptor
    let hasSaga = Reflect.has(store.asyncSagas, key)

    if (process.env.NODE_ENV !== 'production') {
        const oldDescriptor = store.asyncSagas[key]
        if (hasSaga && oldDescriptor && oldDescriptor.saga !== saga) {
            oldDescriptor.task.cancel()
            hasSaga = false
        }
    }

    if (!hasSaga) {
        console.log('inject saga', store.asyncSagas[key], key)
        store.asyncSagas[key] = {
            ...descriptor,
            task: store.runSaga(saga, args)
        }
    }
}

export const ejectSaga = <T>(store: IStore<T>, key: string): void => {
    if (Reflect.has(store.asyncSagas, key)) {
        const descriptor = store.asyncSagas[key]
        console.log('eject descriptor', descriptor)
        if (descriptor) {
            descriptor.task.cancel()
            store.asyncSagas[key] = null
        }
    }
}
