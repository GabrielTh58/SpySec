import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean{
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Token not Found');
    }

    try{
      const secret = process.env.JWT_SECRET
      if(!secret) throw new Error('JWT_SECRET not configured')

      const payload = jwt.verify(token, secret)

      request['user'] = payload
    }catch(error: any){
      throw new UnauthorizedException("Invalid or expired token")
    }
    return true;
  }

  private extractTokenFromHeader(request: any){
    const [type,token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
