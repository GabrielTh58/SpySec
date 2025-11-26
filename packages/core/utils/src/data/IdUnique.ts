import { v4 as uuid } from 'uuid'

export default  class IdUnique {
    static generate(): string {
        return uuid()
    }
}
