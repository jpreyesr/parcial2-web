import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const tokenId = String(req.headers['token-id']);

    if (!tokenId) throw new UnauthorizedException('Token requerido');

    const isValid = await this.tokenService.isTokenValid(tokenId);
    if (!isValid) {
      throw new UnauthorizedException('Api token invalido');
    }
    await this.tokenService.reduceReqLeft(tokenId);
    return true;
  }
}
