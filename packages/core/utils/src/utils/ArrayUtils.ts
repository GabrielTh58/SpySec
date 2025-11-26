export type Predicate = (value: any, index: number, array: any[]) => any

export default class ArrayUtils {
    constructor(readonly valor: any[]) {}

    static items(...items: any[]): ArrayUtils {
        const flatten = items.length === 1 && Array.isArray(items[0])
        const newItens = flatten ? items.flat() : items
        return new ArrayUtils(newItens)
    }

    get first() {
        return this.valor[0]
    }

    get last() {
        return this.valor[this.valor.length - 1]
    }

    get empty() {
        return this.valor.length === 0
    }

    add(...items: any[]): ArrayUtils {
        const array = new ArrayUtils(items)
        return new ArrayUtils([...this.valor, ...array.valor])
    }

    valid(): ArrayUtils {
        const newArray = this.valor.filter((e: any) => e != null && !Number.isNaN(e))
        return new ArrayUtils(newArray)
    }

    filter(...fns: Predicate[]): ArrayUtils {
        const newArray = this.valor.filter((value: any, index: number, array: any[]) => {
            return fns.every((fn) => fn(value, index, array)) ? value : null
        })
        return new ArrayUtils(newArray)
    }

    find(...fns: Predicate[]): any {
        return this.valor.find((value: any, index: number, array: any[]) => {
            return fns.every((fn) => fn(value, index, array)) ? value : null
        }) ?? null
    }
}
