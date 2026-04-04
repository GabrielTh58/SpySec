import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject } from "class-validator";

export class AnalyzeMissionDto {
  @ApiProperty({ description: 'Dictionary with the user\'s answers for each block' })
  @IsObject()    
  @IsNotEmpty()
  answers!: Record<string, any>;
}