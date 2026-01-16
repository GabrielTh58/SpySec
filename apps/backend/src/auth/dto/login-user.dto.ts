import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength } from "class-validator";
import { LoginInputDTO } from "@spysec/auth";

export class LoginUserDTO implements LoginInputDTO {
    @ApiProperty({
        description: "Email do usuário",
        example: "usuario@example.com"
    })
    @IsEmail({}, { message: "Email deve ser um endereço de email válido" })
    email!: string;

    @ApiProperty({
        description: "Senha do usuário",        
        minLength: 6
    })
    @IsString({ message: "Senha deve ser uma string" })
    @MinLength(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    password!: string;
}
