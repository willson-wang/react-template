import {
    Customer,
    ADD_CUSTOMER,
    REMOVE_CUSTOMER,
    CLEAR_CUTOMER,
    GET_HOUSE_LIST,
    GET_GLOBAL_CONFIG,
    CustomerActionTypes
} from './constants'

export const addCustomer = (customer: Customer): CustomerActionTypes => {
    return {
        type: ADD_CUSTOMER, // 使用types.ADD_CUSTOMER的时候ts报错
        customer
    }
}

export const removeCustomer = (customer: Customer): CustomerActionTypes => {
    return {
        type: REMOVE_CUSTOMER,
        customer
    }
}

export const clearCustomer = (): CustomerActionTypes => {
    return {
        type: CLEAR_CUTOMER
    }
}

export const getHouseList = (params: object): CustomerActionTypes => {
    console.log('getHouseList', params, GET_HOUSE_LIST)
    return {
        type: GET_HOUSE_LIST,
        params
    }
}

export const getGlobalConfig = (params: object): CustomerActionTypes => {
    return {
        type: GET_GLOBAL_CONFIG,
        params
    }
}

export interface ActionsMethodTypes {
    addCustomer(customer: Customer): CustomerActionTypes
    removeCustomer(customer: Customer): CustomerActionTypes
    clearCustomer(): CustomerActionTypes
    getHouseList(params: object): CustomerActionTypes
    getGlobalConfig(params: object): CustomerActionTypes
}
