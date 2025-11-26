export default class StringUtils {
    static order(a: string, b: string): number {
        return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
    }

    static insertInto(s: string, indice: number, trecho: string) {
        return s.substring(0, indice) + trecho + s.substring(indice)
    }

    static initials(nome?: string | null): string {
        const separedName = nome?.split(' ') ?? []
        const firstLetters = separedName.map((name) => name[0])
        return `${firstLetters[0] ?? name?.[0] ?? 'A'}${
            firstLetters[1] ?? name?.[1] ?? 'L'
        }`.toUpperCase()
    }
}
