export const debounce = function debounce(fn: any, time: number): object {
    let timer: number
    return function inner(...args: []): void {
        console.log('timer', timer)
        clearTimeout(timer)
        timer = window.setTimeout(() => {
            console.log('xxxx')
            fn(...args)
        }, time)
    }
}

export default {}
