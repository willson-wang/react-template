// import typesGenerator from '../../utils/typesGenerator'

// const types = typesGenerator('customer', `

// ADD_CUSTOMER
// REMOVE_CUSTOMER
// CLEAR_CUTOMER
// GET_HOUSE_LIST
// GET_HOUSE_LIST_SUCC
// GET_GLOBAL_CONFIG
// GET_GLOBAL_CONFIG_SUCC

// `)

export const ADD_CUSTOMER = 'customer@ADD_CUSTOMER'
export const REMOVE_CUSTOMER = 'customer@REMOVE_CUSTOMER'
export const CLEAR_CUTOMER = 'customer@CLEAR_CUTOMER'
export const GET_HOUSE_LIST = 'customer@GET_HOUSE_LIST'
export const GET_HOUSE_LIST_SUCC = 'customer@GET_HOUSE_LIST_SUCC'
export const GET_GLOBAL_CONFIG = 'customer@GET_GLOBAL_CONFIG'
export const GET_GLOBAL_CONFIG_SUCC = 'customer@GET_GLOBAL_CONFIG_SUCC'

export interface Customer {
    name: string
    decs: string
}

export interface House {
    to_top: string
    sort: string
    sort2: string
    sort3: string
    b_cityId: string
    city_name: string
    district_id: string
    b_regbroker_building_infoId: string
    lp_name: string
    address: string
    proj_id: string
    open_date: number
    price: string
    lp_pic: string
    CommissionInfo: string
    custom_tags: string
    status: string
    property_type: string
    building_type: string
    service_admin_tel: string
    longitude: string
    latitude: string
    IsDisplayBroker: number
    IsDisplayCst: number
    IsVisibleBuilding: string
    building_ext_field_type: any
    district_name: string
    focus_time: number
    is_focus: boolean
    is_agency_broker: boolean
    agency_project_partnership_is_active: boolean
    broker_count: number
    cst_count: number
    is_new: number
}

export interface GlobalConfig {
    brokerAlias?: string
    seekingAttentionUrl?: string
    activityUrl?: string
    ShowBrokerRank?: number
    broker_alias?: string
    seeking_attention_url?: string
    pageShareSettingHead?: string
    pageShareSettingRemark?: string
    pageShareSettingUrl?: string
    style?: string
    nav_list?: []
    is_payment?: number
    is_show_logout?: number
    token_name?: string
    is_fan?: number
}

export interface IState {
    customerList: Customer[]
    houseList: House[]
    total: number
    globalConfig: GlobalConfig
}

export interface AddCustomerAction {
    type: typeof ADD_CUSTOMER
    customer: Customer
}

export interface RemoveCustomerAction {
    type: typeof REMOVE_CUSTOMER
    customer: Customer
}

export interface ClearCustomerAction {
    type: typeof CLEAR_CUTOMER
}

export interface GetHouseListAction {
    type: typeof GET_HOUSE_LIST
    params: object
}

export interface GetHouseListSuccAction {
    type: typeof GET_HOUSE_LIST_SUCC
    houseList: House[]
    total: number
}

export interface GetGlobalConfigAction {
    type: typeof GET_GLOBAL_CONFIG
    params: object
}

export interface GetGlobalConfigSuccAction {
    type: typeof GET_GLOBAL_CONFIG_SUCC
    globalConfig: GlobalConfig
}

export type CustomerActionTypes =
    | AddCustomerAction
    | RemoveCustomerAction
    | ClearCustomerAction
    | GetHouseListAction
    | GetHouseListSuccAction
    | GetGlobalConfigAction
    | GetGlobalConfigSuccAction

export default {
    ADD_CUSTOMER,
    REMOVE_CUSTOMER,
    CLEAR_CUTOMER,
    GET_HOUSE_LIST,
    GET_HOUSE_LIST_SUCC,
    GET_GLOBAL_CONFIG,
    GET_GLOBAL_CONFIG_SUCC
}
