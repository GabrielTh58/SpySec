import { Badge } from "../model";

export abstract class BadgeRepository {
    abstract findAll(): Promise<Badge[]>;
    abstract findBySlug(slug: string): Promise<Badge | null>; 
    abstract save(badge: Badge): Promise<void>; 
}