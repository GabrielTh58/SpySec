export default class NumberUtils {
    static duasCasasDecimais(numero: number) {
        return Math.round(numero * 100) / 100
    }

    static isNumber(number: any): boolean {
        if (number === null) return false
        if (isNaN(number)) return false
        if (typeof number === 'number') return true
        if (typeof number === 'string') return !isNaN(parseFloat(number))
        return false
    }

    static min(...number: number[]) {
        return Math.min(...number.filter(NumberUtils.isNumber).map((n) => +n))
    }

    static max(...number: number[]) {
        return Math.max(...number.filter(NumberUtils.isNumber).map((n) => +n))
    }

    static percentual(n1: number, n2: number, housesDecimals: number = 0) {
        if (!n2) return Infinity
        const p = (n1 / n2) * 100
        const factor = Math.pow(10, housesDecimals)
        return Math.round(p * factor) / factor
    }
}
