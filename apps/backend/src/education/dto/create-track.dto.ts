import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackInputDTO, TrackCategory, TrackDifficulty, TrackVisibility } from '@spysec/education';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrackDto implements CreateTrackInputDTO {
  @ApiProperty({
    description: 'Track name',
    example: 'Education Track',
  })
  @IsString()
  @IsNotEmpty({ message: 'Track name is required' })
  title!: string;

  @ApiProperty({
    description: 'Track description',
    example: 'Description of the track',
  })
  @IsString()
  @IsNotEmpty({ message: 'Track description is required' })
  description!: string;

  @ApiProperty({
    description: 'Track icon URL',
    example: 'https://example.com/icon.png',
  })
  @IsString()
  @IsNotEmpty({ message: 'Track icon URL is required' })
  iconUrl!: string;

  @ApiProperty({
    description: 'Minimum level for the track',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  minLevel?: number;

  @ApiProperty({
    description: 'Previous track ID or minimum user level',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  prerequisiteTrackId?: string;

  @ApiProperty({
    description: 'Track difficulty',
    example: 'BASIC',
    enum: TrackDifficulty,
    enumName: 'TrackDifficulty',
  })
  @IsEnum(TrackDifficulty)
  @IsNotEmpty({ message: 'Track difficulty is required' })
  difficulty!: TrackDifficulty;

  @ApiProperty({
    description: 'Target profile for the track',
    example: 'PERSONAL',
    enum: TrackVisibility,
    enumName: 'TrackVisibility',
  })
  @IsEnum(TrackVisibility)
  @IsNotEmpty({ message: 'Target profile is required' })
  targetProfile!: TrackVisibility;

  @ApiProperty({
    description: 'Track category',
    example: 'HARD_SKILLS',
    enum: TrackCategory,
    enumName: 'TrackCategory',
  })
  @IsEnum(TrackCategory)
  @IsNotEmpty({ message: 'Track category is required' })
  category!: TrackCategory;

  @ApiProperty({
    description: 'Tags related to the track',
    example: ['phishing', 'lgpd'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Track tags are required' })
  tags!: string[];
}
