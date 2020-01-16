import { call, all, takeLatest, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { get } from '@utils/fetch'
import types, { House } from './constants'

const houseListUrl = '/api/broker/index/get-building-list'
const configUrl = '/api/site/global-setting'

interface HouseListData {
    total: number
    data: House[]
}

// async function getA(): Promise<any> {
//     const result = await get<HouseListData>(houseListUrl, {})
//     console.log('re', result.data)
// }

export function* getHouseList(params: object): SagaIterator {
    console.log('params', params)
    try {
        // saga里面只能使用这种方式，不能在get、post等方法传入范型约束
        const result: HouseListData = yield call(get, houseListUrl, params)
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
