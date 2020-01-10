export interface ErrorInfo {
    retCode: string
    errMsg: string
    url?: string
}

class CustomError extends Error {
    code: string | number
    errMsg: string

    constructor(info: ErrorInfo) {
        super()
        this.name = `${info.url} Error`
        this.code = info.retCode
        this.errMsg = info.errMsg
        this.stack = new Error().stack
    }
}

export default CustomError
