import { TrackProgress } from "../model/TrackProgress.entity";

export abstract class TrackProgressRepository {
    abstract findProgress(userId: string, trackId: string): Promise<TrackProgress | null>;           
    abstract save(progress: TrackProgress): Promise<void>;        
    abstract findAllProgressByUser(userId: string): Promise<TrackProgress[]>;
}   