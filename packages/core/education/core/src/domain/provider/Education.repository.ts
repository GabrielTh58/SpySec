import { Mission } from "../model/Mission.entity";
import { Track } from "../model/Track.entity";

export abstract class EducationRepository {    
    abstract saveTrack(track: Track): Promise<void>;
    abstract findTrackById(id: string, includeMissions?: boolean): Promise<Track | null>;
    abstract findAllTracks(includeMissions?: boolean): Promise<Track[]>;
    abstract findTrackSlugById(trackId: string): Promise<string | null>; 
    abstract countTotalTracks(): Promise<number>;

    abstract saveMission(mission: Mission): Promise<void>;
    abstract findMissionById(id: string): Promise<Mission | null>;
    abstract findMissionsByTrackId(trackId: string): Promise<Mission[]>;  
    abstract findMissionByOrder(trackId: string, order: number): Promise<Mission | null>; 
    abstract countTotalMissions(): Promise<number>;
}