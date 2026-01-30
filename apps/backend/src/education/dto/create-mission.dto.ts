import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsArray, Min } from "class-validator";
import { CreateMissionInputDTO } from "@spysec/education";
import { MissionBlockDto } from "./mission-block.dto";

export class CreateMissionDto implements CreateMissionInputDTO {
    @ApiProperty({
        description: 'Track ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    @IsNotEmpty({ message: 'Track ID is required' })
    trackId!: string;

    @ApiProperty({
        description: 'Mission title',
        example: 'Mission 1'
    })
    @IsString()
    @IsNotEmpty({ message: 'Mission title is required' })
    title!: string;

    @ApiProperty({
        description: 'Mission description',
        example: 'Description of the mission'
    })
    @IsString()
    @IsNotEmpty({ message: 'Mission description is required' })
    description!: string;

    @ApiProperty({
        description: 'Mission XP reward',
        example: 50
    })
    @IsInt({ message: 'XP reward must be an integer number' })
    @Min(1, { message: 'XP reward must be greater than zero' })
    xpReward!: number;

    @ApiProperty({
        description: 'Mission order',
        example: 0
    })
    @IsInt({ message: 'Order must be an integer number' })
    @Min(0, { message: 'Order cannot be negative' })
    order!: number;

    @ApiProperty({
        description: 'Mission category',
        example: 'BASIC'
    })
    @IsString()
    @IsNotEmpty({ message: 'Mission category is required' })
    category!: string;

    @ApiProperty({
        description: 'Mission content',
        example: [],
        type: Array
    })
    @IsArray({ message: 'Content must be an array of blocks' })
    content!: MissionBlockDto[]; 

    @ApiProperty({
        description: 'Mission icon URL',
        example: 'https://example.com/icon.png',
    })
    @IsString()
    @IsNotEmpty({ message: 'Mission icon URL is required' })
    iconUrl!: string;

    @ApiProperty({
        description: 'Estimated time to complete the mission (in minutes)',
        example: 10
    })
    @IsInt({ message: 'Estimated time must be an integer number' })
    @Min(1, { message: 'Estimated time must be greater than zero' })
    estimatedTime!: number;
}