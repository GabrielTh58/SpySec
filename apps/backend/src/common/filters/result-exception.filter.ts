import { 
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus
  } from '@nestjs/common';
  import { Response } from 'express';
  
  
  @Catch(Error)
  export class ResultExceptionFilter implements ExceptionFilter {
    
    private readonly errorStatusMap: Record<string, HttpStatus> = {
      'INVALID_CREDENTIALS': HttpStatus.UNAUTHORIZED,
      'INVALID_TOKEN': HttpStatus.UNAUTHORIZED,
      'TOKEN_EXPIRED': HttpStatus.UNAUTHORIZED,
      'EMAIL_NOT_VERIFIED': HttpStatus.FORBIDDEN,
      'INVALID_EMAIL': HttpStatus.BAD_REQUEST,
      'INVALID_PASSWORD': HttpStatus.BAD_REQUEST,
      'INVALID_NAME': HttpStatus.BAD_REQUEST,
      'VALIDATION_ERROR': HttpStatus.BAD_REQUEST,
      'USER_NOT_FOUND': HttpStatus.NOT_FOUND,
      'EMAIL_ALREADY_EXISTS': HttpStatus.CONFLICT,
      'INTERNAL_ERROR': HttpStatus.INTERNAL_SERVER_ERROR,
    };
  
    private readonly errorMessageMap: Record<string, string> = {
      'INVALID_CREDENTIALS': 'Email ou senha inválidos',
      'INVALID_TOKEN': 'Token de autenticação inválido',
      'TOKEN_EXPIRED': 'Sessão expirada. Faça login novamente',
      'EMAIL_NOT_VERIFIED': 'Verifique seu email antes de continuar',
      'EMAIL_ALREADY_EXISTS': 'Este email já está cadastrado',
      'USER_NOT_FOUND': 'Usuário não encontrado',
      'INVALID_EMAIL': 'Email inválido',
      'INVALID_PASSWORD': 'Senha deve ter no mínimo 6 caracteres',
      'INVALID_NAME': 'Nome inválido',
    };
  
    catch(exception: Error, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const errorCode = this.extractErrorCode(exception.message);
      const status = this.errorStatusMap[errorCode] || HttpStatus.INTERNAL_SERVER_ERROR;
      const errorResponse = {
        statusCode: status,
        error: errorCode,
        message: this.errorMessageMap[errorCode] || exception.message,
        timestamp: new Date().toISOString(),
      };
      if (status >= 500) {
        console.error('🔥 Server Error:', exception);
      }
      response.status(status).json(errorResponse);
    }
  
    private extractErrorCode(message: string): string {
      const parts = message.split(':');
      return parts[0].trim();
    }
  }