import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import CustomError from './customError'

export interface ResponseData<T> {
    retCode: string
    data: T
    errMsg?: string
}
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    notResolveResult?: boolean
}

export interface CustomAxiosResponse<T> extends AxiosResponse<ResponseData<T>> {
    config: CustomAxiosRequestConfig
}

type CustomErrors<T> = new () => T

const instance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json; utf-8'
    }
})

console.log('axios', axios)

const ERROR_STATUS = [500, 501, 502]

function checkStatus(res: CustomAxiosResponse<any>): any {
    if (ERROR_STATUS.indexOf(res.status) > -1) {
        return Promise.reject(
            new CustomError({ retCode: res.data.retCode, errMsg: res.data.errMsg })
        )
    }
    return res
}

function checkRetCode(res: CustomAxiosResponse<any>): any {
    if (res.data.retCode !== '0') {
        return Promise.reject(
            new CustomError({ retCode: res.data.retCode, errMsg: res.data.errMsg })
        )
    }
    return res
}

function resolveResult(res: CustomAxiosResponse<any>): CustomAxiosResponse<any> {
    if (res.config.notResolveResult) {
        return res
    }
    console.log('sss', res)
    return res.data.data
}

async function transFormResponse(res: CustomAxiosResponse<any>): Promise<CustomAxiosResponse<any>> {
    return Promise.resolve(res)
        .then(checkStatus)
        .then(checkRetCode)
        .then(resolveResult)
}

instance.interceptors.request.use(
    (config) => {
        return config
    },
    async (err) => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    async (res) => {
        return transFormResponse(res)
    },
    async (err) => {
        return Promise.reject(err)
    }
)

export const get = async <T>(url: string, config: CustomAxiosRequestConfig): Promise<T> => {
    return instance.get(url, config)
}

// 这种方式虽然也可以进行约束，但是因为返回值是promise<any>，实用输入的时候得不到代码提示
// export const get = async <T>(url: string, config: AxiosRequestConfig): Promise<any> => {
//     console.log('get', url, config)
//     return instance.get<T>(url, config)
// }

export const post = async <T>(
    url: string,
    data: object,
    config: CustomAxiosRequestConfig
): Promise<T> => {
    return instance.post(url, data, config)
}

// export const request = async <T, R = CustomAxiosResponse<T>>(config: CustomAxiosRequestConfig): Promise<R> => {
//     return instance.request(config)
// }

// @TODO 这里只约束了封装的方法的输出，没有约束axios.request的输入与输出；不采用上面的方式是因为，在resolveResult方法里面直接返回了res.data.data
export const request = async <T>(config: CustomAxiosRequestConfig): Promise<T> => {
    return instance.request(config)
}

export default {
    get,
    post,
    request
}
