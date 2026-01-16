export interface PlayerProfileResponseDTO {
    userId: string; 
    nickname: string;
    type: string;
    level: number;
    currentXp: number;
    streak: number;
    badges: string[]; 
}
