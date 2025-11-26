export class Validator {
    static null(erro: string, value: any): string | null {
        return value === null || value === undefined ? null : erro
    }

    static nullOrEmpty(erro: string, value: any): string | null {
        return value === null || value === undefined || value === '' ? null : erro
    }

    static notNull(erro: string, value: any): string | null {
        return value !== null && value !== undefined ? null : erro
    }

    static notNullOrEmpty(erro: string, value: any): string | null {
        return value !== null && value !== undefined && value !== '' ? null : erro
    }

    static greaterThan(erro: string, value: number, min: number): string | null {
        return value > min ? null : erro
    }

    static greaterThanOrEqual(erro: string, value: number, min: number): string | null {
        return value >= min ? null : erro
    }

    static lessThan(erro: string, value: number, max: number): string | null {
        return value < max ? null : erro
    }

    static lessThanOrEqual(erro: string, value: number, max: number): string | null {
        return value <= max ? null : erro
    }

    static between(erro: string, value: number, min: number, max: number): string | null {
        return value >= min && value <= max ? null : erro
    }

    static email(erro: string, value: string): string | null {
        const regex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(value) ? null : erro
    }

    static password(erro: string, value: string): string | null {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        return regex.test(value) ? null : erro
    }
}