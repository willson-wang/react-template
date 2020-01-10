import types from './constants'

interface Act {
    type: string
    num: number
}

export const increase = (num: number): Act => {
    return {
        type: types.INCREASE,
        num
    }
}

export const decrease = (num: number): Act => {
    return {
        type: types.DECREASE,
        num
    }
}

export interface AppActionsMethodTypes {
    increase(num: number): Act
    decrease(num: number): Act
}
