import { ApiProperty } from "@nestjs/swagger";

export class MissionBlockDto{
    @ApiProperty()
    id!: string;

    @ApiProperty({ enum: ['INFO', 'QUIZ', 'HOTSPOT'] })
    type!: 'INFO' | 'QUIZ' | 'HOTSPOT' | 'INPUT';

    @ApiProperty()
    data!: any; 
}