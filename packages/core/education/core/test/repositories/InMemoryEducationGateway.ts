import { EducationRepository, Mission, Track } from "@spysec/education";

export class InMemoryEducationRepository implements EducationRepository {
    tracks: Track[] = [];
    missions: Mission[] = [];

    async findTrackSlugById(trackId: string): Promise<string | null> {
        const track = this.tracks.find(t => t.id.toString() === trackId);
        return track ? "slug-simulado" : null; // Retorna um slug fake se achar
    }

    async saveTrack(track: Track): Promise<void> {
        const index = this.tracks.findIndex(t => t.id.equals(track.id));
        if (index !== -1) {
            this.tracks[index] = track;
        } else {
            this.tracks.push(track);
        }
    }

    async findTrackById(id: string): Promise<Track | null> {
        const track = this.tracks.find(t => t.id.toString() === id);
        if (!track) return null;
        return this._hydrateTrackWithMissions(track);
    }

    async findAllTracks(isActiveOnly: boolean): Promise<Track[]> {
        let result = this.tracks;
        if (isActiveOnly) {
            result = result.filter(t => t.isActive);
        }
        return result.map(t => this._hydrateTrackWithMissions(t));  
    }
    
    async saveMission(mission: Mission): Promise<void> {
        this.missions.push(mission);
    }

    async findMissionById(id: string): Promise<Mission | null> {
        return this.missions.find(m => m.id.toString() === id) || null;
    }

    async findMissionsByTrackId(trackId: string): Promise<Mission[]> {
        return this.missions.filter(m => m.trackId === trackId);
    }

    async findMissionByOrder(trackId: string, order: number): Promise<Mission | null> {
        return this.missions.find(m => m.trackId === trackId && m.order === order) || null;
    }

    private _hydrateTrackWithMissions(track: Track): Track {
        const trackMissions = this.missions.filter(m => m.trackId === track.id.toString());
        
        const hydratedTrack = Object.create(Object.getPrototypeOf(track));
        Object.assign(hydratedTrack, track);
        
        Object.defineProperty(hydratedTrack, 'missions', {
            value: trackMissions,
            writable: true,
            configurable: true
        });

        return hydratedTrack;
    }
}