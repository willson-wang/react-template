import { call, all, takeLatest, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { get } from '@utils/fetch'
import types from './constants'

const houseListUrl = '/api/broker/index/get-building-list'
const configUrl = '/api/site/global-setting'

export function* getHouseList(params: object): SagaIterator {
    console.log('params', params)
    try {
        const result = yield call(get, houseListUrl, params)
        console.log('data', result)
        yield put({
            type: types.GET_HOUSE_LIST_SUCC,
            houseList: result.data,
            total: result.total
        })
    } catch (error) {
        console.log('error', error)
    }
}

export function* getGlobalConfig(params: object): SagaIterator {
    try {
        const result = yield call(get, configUrl, params)
        console.log('result', result)
        yield put({
            type: types.GET_GLOBAL_CONFIG_SUCC,
            globalConfig: result
        })
    } catch (error) {
        console.log('error', error)
    }
}

export default function* root(): SagaIterator {
    yield all([
        takeLatest(types.GET_HOUSE_LIST, getHouseList),
        takeLatest(types.GET_GLOBAL_CONFIG, getGlobalConfig)
    ])
}
