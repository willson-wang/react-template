import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import CustomError from './customError'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    notResolveResult?: boolean
}

interface CustomAxiosResponse extends AxiosResponse {
    config: CustomAxiosRequestConfig
}

const instance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json; utf-8'
    }
})

console.log('axios', axios)

const ERROR_STATUS = [500, 501, 502]

function checkStatus(res: AxiosResponse): object {
    if (ERROR_STATUS.indexOf(res.status) > -1) {
        return Promise.reject(
            new CustomError({ retCode: res.data.retCode, errMsg: res.data.errMsg })
        )
    }
    return res
}

function checkRetCode(res: AxiosResponse): object {
    if (res.data.retCode !== '0') {
        return Promise.reject(
            new CustomError({ retCode: res.data.retCode, errMsg: res.data.errMsg })
        )
    }
    return res
}

function resolveResult(res: CustomAxiosResponse): AxiosResponse | object {
    if (res.config.notResolveResult) {
        return res
    }
    return res.data.data
}

async function transFormResponse(res: object): Promise<any> {
    return Promise.resolve(res)
        .then(checkStatus)
        .then(checkRetCode)
        .then(resolveResult)
}

instance.interceptors.request.use(
    (config) => {
        return config
    },
    async (err): Promise<object> => {
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    async (res) => {
        return transFormResponse(res)
    },
    async (err): Promise<object> => {
        return Promise.reject(err)
    }
)

export const get = async (url: string, config: AxiosRequestConfig): Promise<any> => {
    console.log('get', url, config)
    return instance.get(url, config)
}

export const post = async (url: string, data: object, config: AxiosRequestConfig): Promise<any> => {
    return instance.post(url, data, config)
}

export const request = async (config: AxiosRequestConfig): Promise<any> => {
    return instance.request(config)
}

export default {
    get,
    post,
    request
}
