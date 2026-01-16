import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackInputDTO, TrackDifficulty, TrackVisibility } from '@spysec/education';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrackDto implements CreateTrackInputDTO {
  @ApiProperty({
    description: 'Nome da trilha',
    example: 'Trilha de Educação',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nome da trilha é obrigatório' })
  title!: string;

  @ApiProperty({
    description: 'Descrição da trilha',
    example: 'Descrição da trilha',
  })
  @IsString()
  @IsNotEmpty({ message: 'Descrição da trilha é obrigatório' })
  description!: string;

  @ApiProperty({
    description: 'URL do ícone da trilha',
    example: 'https://example.com/icon.png',
  })
  @IsString()
  @IsNotEmpty({ message: 'URL do ícone da trilha é obrigatório' })
  iconUrl!: string;

  @ApiProperty({
    description: 'Nível mínimo da trilha',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  minLevel?: number;

  @ApiProperty({
    description: 'ID da trilha anterior ou nível mínimo do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  prerequisiteTrackId?: string;

  @ApiProperty({
    description: 'Dificuldade da trilha',
    example: 'BASIC',
    enum: TrackDifficulty,
    enumName: 'TrackDifficulty',
  })
  @IsEnum(TrackDifficulty)
  @IsNotEmpty({ message: 'Dificuldade da trilha é obrigatório' })
  difficulty!: TrackDifficulty;

  @ApiProperty({
    description: 'Perfil alvo da trilha',
    example: 'PERSONAL',
    enum: TrackVisibility,
    enumName: 'TrackVisibility',
  })
  @IsEnum(TrackVisibility)
  @IsNotEmpty({ message: 'Perfil alvo da trilha é obrigatório' })
  targetProfile!: TrackVisibility;
}
