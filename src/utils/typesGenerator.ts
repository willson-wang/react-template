interface Types {
    [key: string]: string
}

const namespaces: string[] = []

const typesGenerator = (namespace: string, types: string): Types => {
    if (typeof namespace === 'undefined') {
        throw new Error('namespace 不能为空')
    }
    if (namespaces.indexOf('namespace') > -1) {
        throw new Error('namespace 不能重复')
    }
    if (typeof types === 'undefined') {
        throw new Error('types 不能为空')
    }
    namespaces.push(namespace)
    const initType: Types = {}
    return types
        .trim()
        .replace(/[\s\b]+/g, '\n')
        .split('\n')
        .reduce((prev, type) => {
            if (typeof prev[type] === 'undefined') {
                prev[type] = `${namespace}@${type}`
            }
            return prev
        }, initType)
}

export default typesGenerator
