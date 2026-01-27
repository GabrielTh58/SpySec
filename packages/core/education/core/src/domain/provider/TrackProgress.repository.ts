import { TrackProgress } from "../model/TrackProgress.entity";

export interface NextMissionResult {
    id: string;          
    title: string;       
    description: string; 
    xpReward: number; 
    trackTitle: string;  
    order: number;       
}

export abstract class TrackProgressRepository {
    abstract findProgress(userId: string, trackId: string): Promise<TrackProgress | null>;           
    abstract save(progress: TrackProgress): Promise<void>;        
    abstract findAllProgressByUser(userId: string): Promise<TrackProgress[]>;

    abstract countCompletedMissionsByUserId(userId: string): Promise<number>;
    abstract countCompletedTracksByUserId(userId: string): Promise<number>;
    abstract findNextMissionToPlay(userId: string): Promise<NextMissionResult | null>;
    abstract countCompletedMissionsSince(userId:string, startOfMonth: Date): Promise<number>;
}   