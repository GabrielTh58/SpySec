import ObjetoUtils from './ObjectUtils'

export default class DateUtils {
    static addDays(ref: Date, quantity: number): Date {
        return new Date(
            ref.getFullYear(),
            ref.getMonth(),
            ref.getDate() + quantity,
            ref.getHours(),
            ref.getMinutes(),
            ref.getSeconds(),
            ref.getMilliseconds()
        )
    }

    static addMonths(ref: Date, quantity: number): Date {
        const lastDayMonth = new Date(ref.getFullYear(), ref.getMonth() + quantity + 1, 0)
        return new Date(
            lastDayMonth.getFullYear(),
            lastDayMonth.getMonth(),
            Math.min(ref.getDate(), lastDayMonth.getDate()),
            ref.getHours(),
            ref.getMinutes(),
            ref.getSeconds(),
            ref.getMilliseconds()
        )
    }

    static addYears(ref: Date, quantity: number): Date {
        return DateUtils.addMonths(ref, quantity * 12)
    }

    static convertDataFS(datas: any): any {
        if (!datas) return datas
        return Object.keys(datas).reduce((obj: any, prop: string) => {
            return {
                ...obj,
                [prop]: DateUtils.convertDataFS(datas[prop]),
            }
        }, {})
    }

    static convertDataFSAtrib(value: any): any {
        if (value?.toDate) {
            return value.toDate()
        } else if (ObjetoUtils.isObject(value)) {
            return DateUtils.convertDataFS(value)
        } else if (Array.isArray(value)) {
            return value.map((v) => DateUtils.convertDataFSAtrib(v))
        } else {
            return value
        }
    }

    static min(...dates: Date[]) {
        if (!dates.length) return null
        return dates.reduce((min, dt) => {
            return min < dt ? min : dt
        })
    }

    static max(...dates: Date[]) {
        if (!dates.length) return null
        return dates.reduce((max, dt) => {
            return max > dt ? max : dt
        })
    }

    static monthsBetween(d1: Date, d2: Date): Date[] {
        return DateUtils.dateBetween(d1, d2, 'm')
    }

    static daysBetween(d1: Date, d2: Date): Date[] {
        return DateUtils.dateBetween(d1, d2, 'd')
    }

    static yearsBetween(d1: Date, d2: Date): Date[] {
        return DateUtils.dateBetween(d1, d2, 'y')
    }

    static dateBetween(d1: Date, d2: Date, frequency?: 'd' | 'm' | 'y'): Date[] {
        const start = DateUtils.min(d1, d2)
        const end = DateUtils.max(d1, d2)
        if (!start || !end) return []

        const porDia = frequency === 'd'
        const porAno = frequency === 'y'
        const adicionar = porDia
            ? DateUtils.addDays
            : porAno
              ? DateUtils.addYears
              : DateUtils.addMonths

        const dates = [start]
        const next = () => adicionar(start, dates.length)
        while (next() <= end) dates.push(next())

        return dates
    }

    static inDifferentDays(dt1: Date, dt2: Date) {
        return !DateUtils.sameDay(dt1, dt2)
    }

    static inDifferentMonths(dt1: Date, dt2: Date) {
        return !DateUtils.sameMonth(dt1, dt2)
    }

    static inDifferentYears(dt1: Date, dt2: Date) {
        return !DateUtils.sameYear(dt1, dt2)
    }

    static sameDay(dt1: Date, dt2: Date) {
        if (!dt1 || !dt2) return false
        const equalDay = dt1.getDate() === dt2.getDate()
        return DateUtils.sameYear(dt1, dt2) && DateUtils.sameMonth(dt1, dt2) && equalDay
    }

    static sameMonth(dt1: Date, dt2: Date) {
        if (!dt1 || !dt2) return false
        const equalMonth = dt1.getMonth() === dt2.getMonth()
        return DateUtils.sameYear(dt1, dt2) && equalMonth
    }

    static sameYear(dt1: Date, dt2: Date) {
        if (!dt1 || !dt2) return false
        return dt1.getFullYear() === dt2.getFullYear()
    }

    static subtractDays(dt: Date, qtde: number) {
        return DateUtils.addDays(dt, -qtde)
    }

    static subtractMonths(dt: Date, qtde: number) {
        return DateUtils.addMonths(dt, -qtde)
    }

    static subtractYears(dt: Date, qtde: number) {
        return DateUtils.addYears(dt, -qtde)
    }

    static firstDayOfMonth(dt: Date) {
        const year = dt.getFullYear()
        const month = dt.getMonth() + 1
        return new Date(`${year}/${month}/01 00:00:00`)
    }

    static lastDayOfMonth(dt: Date) {
        return new Date(dt.getFullYear(), dt.getMonth() + 1, 0)
    }

    static differenceInDays(start: Date, end: Date): number {
        const startDt = DateUtils.min(start, end)!
        const endDt = DateUtils.max(start, end)!
        const next = () => DateUtils.addDays(startDt, diff + 1)

        let diff = 0
        while (next() <= endDt) diff++
        return diff
    }

    static differenceInMonths(start: Date, end: Date): number {
        const t1 = start.getFullYear() * 12 + start.getMonth()
        const t2 = end.getFullYear() * 12 + end.getMonth()
        return Math.abs(t1 - t2)
    }

    static differenceInYears(start: Date, end: Date): number {
        const diff = start.getFullYear() - end.getFullYear()
        return Math.abs(diff)
    }

    static last12Months(ref: Date): Date[] {
        const start = DateUtils.addMonths(DateUtils.subtractYears(ref, 1), 1)
        return DateUtils.monthsBetween(
            DateUtils.firstDayOfMonth(start),
            DateUtils.firstDayOfMonth(ref)
        )
    }
}
