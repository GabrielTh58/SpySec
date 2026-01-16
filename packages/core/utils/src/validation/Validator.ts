export class Validator {
    static null(error: string, value: any): string | null {
        return value === null || value === undefined ? null : error
    }

    static nullOrEmpty(error: string, value: any): string | null {
        return value === null || value === undefined || value === '' ? null : error
    }

    static notNull(error: string, value: any): string | null {
        return value !== null && value !== undefined ? null : error
    }

    static notNullOrEmpty(error: string, value: any): string | null {
        return value !== null && value !== undefined && value !== '' ? null : error
    }

    static greaterThan(error: string, value: number, min: number): string | null {
        return value > min ? null : error
    }

    static greaterThanOrEqual(error: string, value: number, min: number): string | null {
        return value >= min ? null : error
    }

    static lessThan(error: string, value: number, max: number): string | null {
        return value < max ? null : error
    }

    static lessThanOrEqual(error: string, value: number, max: number): string | null {
        return value <= max ? null : error
    }

    static between(error: string, value: number, min: number, max: number): string | null {
        return value >= min && value <= max ? null : error
    }

    static email(error: string, value: string): string | null {
        const regex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(value) ? null : error
    }

    static password(error: string, value: string): string | null {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        return regex.test(value) ? null : error
    }

    static isInteger(error: string, value: number): string | null {
        return Number.isInteger(value) ? null : error;
    }
}