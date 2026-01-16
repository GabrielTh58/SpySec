import { Level } from "../model/Level.entity";

export abstract class LevelRepository {
    abstract findByNumber(levelNumber: number): Promise<Level | null>;    
    abstract findAll(): Promise<Level[]>;
}