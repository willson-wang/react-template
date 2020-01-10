import { ILoadedState } from '../constants'

interface Action {
    type: string
    [key: string]: any
}

interface ActionHandlers {
    [key: string]: (state: ILoadedState, action: Action) => void
}

const reducerGeneragtor = (initState = {}, actionHandlers: ActionHandlers) => {
    return (state = initState, action: Action) => {
        const handler = actionHandlers[action.type]
        return typeof handler !== 'undefined' ? handler(state, action) : state
    }
}

export default reducerGeneragtor
