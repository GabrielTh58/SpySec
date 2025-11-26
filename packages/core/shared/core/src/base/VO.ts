import {fn} from '@spysec/utils';

export abstract class VO<T> {
    constructor(readonly value: T) {}

    equals(outro: VO<T>): boolean {
        return fn.obj.equals(this.value, outro.value);
    }
    
    different(outro: VO<T>): boolean {
        return !this.equals(outro);
    }
}