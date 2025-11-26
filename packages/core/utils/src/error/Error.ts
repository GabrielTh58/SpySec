export default interface Error {
    type: string
    value?: any
    details?: any
    msg?: (e?: Error) => string
}
