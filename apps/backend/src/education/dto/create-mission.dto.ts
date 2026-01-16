import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsArray, Min } from "class-validator";
import { CreateMissionInputDTO } from "@spysec/education";
import { MissionBlockDto } from "./mission-block.dto";

export class CreateMissionDto implements CreateMissionInputDTO {
    @ApiProperty({
        description: 'ID da trilha',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    @IsNotEmpty({ message: 'ID da trilha é obrigatório' })
    trackId!: string;

    @ApiProperty({
        description: 'Título da missão',
        example: 'Missão 1'
    })
    @IsString()
    @IsNotEmpty({ message: 'Título da missão é obrigatório' })
    title!: string;

    @ApiProperty({
        description: 'Descrição da missão',
        example: 'Descrição da missão'
    })
    @IsString()
    @IsNotEmpty({ message: 'Descrição da missão é obrigatório' })
    description!: string;

    @ApiProperty({
        description: 'Recompensa de XP da missão',
        example: 50
    })
    @IsInt({ message: 'A recompensa de XP deve ser um número inteiro' })
    @Min(1, { message: 'A recompensa de XP deve ser maior que zero' })
    xpReward!: number;

    @ApiProperty({
        description: 'Ordem da missão',
        example: 0
    })
    @IsInt({ message: 'A ordem deve ser um número inteiro' })
    @Min(0, { message: 'A ordem não pode ser negativa' })
    order!: number;

    @ApiProperty({
        description: 'Categoria da missão',
        example: 'BÁSICA'
    })
    @IsString()
    @IsNotEmpty({ message: 'Categoria da missão é obrigatória' })
    category!: string;

    @ApiProperty({
        description: 'Conteúdo da missão',
        example: [],
        type: Array
    })
    @IsArray({ message: 'O conteúdo deve ser um array de blocos' })
    content!: MissionBlockDto[]; 
}