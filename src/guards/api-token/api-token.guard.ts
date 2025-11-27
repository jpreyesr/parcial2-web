import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const tokenId = Number(req.headers['token-id']);

    if (!tokenId) throw new UnauthorizedException('Token requerido');

    const token = this.tokenService.findOne(tokenId);
    if (!token) throw new UnauthorizedException('Token inválido');

    req.tokenId = tokenId;
    return true;
  }
}
