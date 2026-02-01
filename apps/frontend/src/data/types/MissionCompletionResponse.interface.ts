import { CompleteMissionOutputDTO } from "@spysec/education";

export interface MissionCompletionResponse extends CompleteMissionOutputDTO {
    leveledUp?: boolean;
    newBadge?: {
        id: string;
        name: string;
        description: string;
        iconUrl: string;
        rarity: string;
    } | null;
}