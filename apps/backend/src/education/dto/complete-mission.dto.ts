import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsNotEmpty, IsNumber } from 'class-validator';

export class CompleteMissionDto {
    @ApiProperty({
        description: 'Object of answers provided for each mission block, using blockId as the key',
        example: {
            "blockId1": "resposta do usuário",
            "blockId2": 1234,
            "blockId3": true
        }
    })
    @IsObject({ message: 'Answers must be a JSON object mapping blockId to value' })
    @IsNotEmpty()
    answers!: Record<string, any>;
    
    @ApiProperty({
        description: 'Total time spent on the mission attempt, in seconds',
        example: 210
    })
    @IsNumber()
    timeSpent!: number

}