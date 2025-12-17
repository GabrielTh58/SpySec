import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsEnum, MinLength } from "class-validator";
import { ProfileType, RegisterUserInput } from "@spysec/auth";

export class RegisterUserDTO implements RegisterUserInput {
    @ApiProperty({
        description: "Email do usuário",
        example: "usuario@example.com"
    })
    @IsEmail({}, { message: "Email deve ser um endereço de email válido" })
    email!: string;

    @ApiProperty({
        description: "Senha do usuário",        
        minLength: 6,
        example: "#Senha123"
    })
    @IsString({ message: "Senha deve ser uma string" })
    @MinLength(6, { message: "Senha deve ter pelo menos 6 caracteres" })    
    password!: string;

    @ApiProperty({
        description: "Nome completo do usuário",
        example: "João Silva"
    })
    @IsString({ message: "Nome deve ser uma string" })
    name!: string;

    @ApiProperty({
        description: "Tipo de perfil do usuário",
        enum: ProfileType,
        example: ProfileType.PERSONAL
    })
    @IsEnum(ProfileType, { message: "Tipo de perfil deve ser 'pessoal' ou 'corporativo'" })
    profileType!: ProfileType;
}