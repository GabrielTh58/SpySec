import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginWithGoogleInputDTO, ProfileType } from '@spysec/auth';

export class LoginWithGoogleDTO implements LoginWithGoogleInputDTO{
  @ApiProperty({
    description: 'ID Token retornado pelo Firebase após login com Google',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOWdkazcifQ...',
  })
  @IsString()
  @IsNotEmpty({ message: 'ID Token é obrigatório' })
  idToken!: string;

  @ApiProperty({
    description: 'Tipo de perfil do usuário (opcional, será inferido se não fornecido)',
    enum: ProfileType,
    example: ProfileType.PERSONAL,
    required: false,
  })
  @IsEnum(ProfileType, { message: 'Tipo de perfil inválido' })
  @IsOptional()
  profileType?: ProfileType;
}