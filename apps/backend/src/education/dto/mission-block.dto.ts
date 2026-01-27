import { ApiProperty } from "@nestjs/swagger";

export class MissionBlockDto {
    @ApiProperty({
        description: 'Unique identifier for the block',
        example: 'block-123e4567-e89b-12d3-a456-426614174000',
    })
    id!: string;

    @ApiProperty({
        description: 'Type of the mission block',
        enum: ['INFO', 'QUIZ', 'HOTSPOT', 'INPUT'],
        example: 'QUIZ'
    })
    type!: 'INFO' | 'QUIZ' | 'HOTSPOT' | 'INPUT';

    @ApiProperty({
        description: 'Block-specific data (varies according to block type)',
        example: { question: 'What is phishing?', options: ['Option A', 'Option B'], answer: 'Option A' }
    })
    data!: any;
}