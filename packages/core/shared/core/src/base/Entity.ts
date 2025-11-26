import { Id } from "../types/Id.vo";

export interface EntityProps {
    id?: string;
}

export abstract class Entity <Type, Props extends EntityProps>{
    constructor(readonly id: Id) {} 

    equals(entity: Entity<Type, Props>): boolean {
        return this.id.equals(entity.id);   
    } 

    different(entity: Entity<Type, Props>): boolean {
        return this.id.different(entity.id);
    } 
}