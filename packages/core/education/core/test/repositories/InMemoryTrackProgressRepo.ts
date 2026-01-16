import { TrackProgress, TrackProgressRepository } from "@spysec/education";

export class InMemoryTrackProgressRepository implements TrackProgressRepository {
    private progressMap: Map<string, TrackProgress> = new Map();

    async findAllProgressByUser(userId: string): Promise<TrackProgress[]> {
        return Array.from(this.progressMap.values()).filter(
            (p) => p.userId === userId
        );
    }

    async findProgress(userId: string, trackId: string): Promise<TrackProgress | null> {
        const key = this._getKey(userId, trackId);
        return this.progressMap.get(key) || null;
    }

    async save(progress: TrackProgress): Promise<void> {
        const key = this._getKey(progress.userId, progress.trackId);
        this.progressMap.set(key, progress);
    }

    private _getKey(userId: string, trackId: string): string {
        return `${userId}-${trackId}`;
    }

    clear(): void {
        this.progressMap.clear();
    }
}   