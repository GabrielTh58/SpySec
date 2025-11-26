export default class ObjectUtils {
    static equals(a: any, b: any): boolean {
        if (a === b) return true
        if (a == null || b == null) return false
        if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
        if (typeof a !== 'object' || typeof b !== 'object') return false

        const keys = Object.keys(a)
        if (keys.length !== Object.keys(b).length) return false
        return keys.every((k) => ObjectUtils.equals(a[k], b[k]))
    }

    static undefinedToNull(obj: any): any {
        return Object.keys(obj).reduce((fullObject: any, prop: string) => {
            let value = obj[prop]
            if (ObjectUtils.isObject(value)) {
                value = ObjectUtils.undefinedToNull(value)
            }
            return { ...fullObject, [prop]: value ?? null }
        }, {})
    }

    static isObject(value?: any): boolean {
        const typeObject = typeof value === 'object'
        const typeObjectNotNull = value != null && typeObject
        return typeObjectNotNull && value.constructor === Object
    }

    static stayAtribs(obj: any, atribs: string[]): any {
        if (!obj || !atribs || atribs.length === 0) return {}
        return atribs.reduce((newObj: any, atrib: string) => {
            if (obj[atrib] !== undefined) newObj[atrib] = obj[atrib]
            return newObj
        }, {})
    }

    static removeAtribs(obj: any, attrs: string[]): any {
        if (!obj || !attrs || attrs.length === 0) return obj
        const attrsToKeep = Object.keys(obj as any).filter((attr) => !attrs.includes(attr))
        return ObjectUtils.stayAtribs(obj, attrsToKeep)
    }

    static getValue(obj: any, caminho: string): any {
        const clone = { ...obj }
        const atributes = caminho.split(/[\[\].]+/)
        const lastAtrib = atributes.pop()
        const lastObj = atributes.reduce((acc, key) => acc[key], clone)
        return lastObj[lastAtrib!]
    }

    static changeValue(obj: any, caminho: string, valor: any): any {
        const clone = { ...obj }
        const atributes = caminho.split(/[\[\].]+/)
        const lastAtrib = atributes.pop()
        const lastObj = atributes.reduce((acc, key) => {
            if (acc[key] === undefined) {
                acc[key] = {}
            }
            return acc[key]
        }, clone)
        lastObj[lastAtrib!] = valor
        return clone
    }
}
