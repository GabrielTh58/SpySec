  import { 
      ExceptionFilter,
      Catch,
      ArgumentsHost,
      HttpStatus,
      HttpException,
      Logger
    } from '@nestjs/common';
    import { Response } from 'express';
    
    
    @Catch(Error)
    export class GlobalExceptionFilter implements ExceptionFilter { 
      private readonly logger = new Logger(GlobalExceptionFilter.name);
      
      private readonly errorStatusMap: Record<string, HttpStatus> = {
        // --- AUTH ---
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
        'PASSWORD_WEAK': HttpStatus.BAD_REQUEST,
        'INVALID_GOOGLE_TOKEN': HttpStatus.UNAUTHORIZED,
        
        // --- GAMIFICATION (Novos) ---
        'PLAYER_NOT_FOUND': HttpStatus.NOT_FOUND,
        'LEVEL_NOT_FOUND': HttpStatus.NOT_FOUND,
        'BADGE_NOT_FOUND': HttpStatus.NOT_FOUND,
        'XP_REWARD_MUST_BE_POSITIVE': HttpStatus.BAD_REQUEST,
        'SLUG_ALREADY_EXISTS': HttpStatus.CONFLICT,
        
        // --- GENÉRICOS ---
        'INTERNAL_ERROR': HttpStatus.INTERNAL_SERVER_ERROR,
        'INVALID_INPUT': HttpStatus.BAD_REQUEST,
      };
    
      private readonly errorMessageMap: Record<string, string> = {
        // --- AUTH ---
        'INVALID_CREDENTIALS': 'Email ou senha inválidos',
        'TOKEN_EXPIRED': 'Sessão expirada. Faça login novamente',
        'EMAIL_ALREADY_EXISTS': 'Este email já está cadastrado',
        'PASSWORD_WEAK': 'A senha deve ser forte',
        'INVALID_GOOGLE_TOKEN': 'Token de Google inválido',
        // --- GAMIFICATION ---
        'PLAYER_NOT_FOUND': 'Perfil de jogador não encontrado.',
        'LEVEL_NOT_FOUND': 'Nível não encontrado.',
        'XP_REWARD_MUST_BE_POSITIVE': 'A recompensa de XP deve ser positiva.',
      }  

      catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
    
        if (exception instanceof HttpException) {
          const status = exception.getStatus();
          return response.status(status).json(exception.getResponse());
        }
    
        const errorCode = this.extractErrorCode(exception.message);        
        const status = this.errorStatusMap[errorCode] || HttpStatus.INTERNAL_SERVER_ERROR;
    
        const message = this.errorMessageMap[errorCode] || exception.message;
    
        const errorResponse = {
          statusCode: status,
          error: errorCode,
          message: message,
          timestamp: new Date().toISOString(),
        };
    
        if (status >= 500) {
          this.logger.error(`Server Error: ${errorCode}`, exception.stack);
        }
    
        response.status(status).json(errorResponse);
      }
    
      private extractErrorCode(message: string): string {
        const parts = message.split(':');
        return parts[0].trim();
      }
    }