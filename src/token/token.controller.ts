import { Controller, Get, Post, Body, Patch, Param, UseGuards} from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from 'src/guards/api-token/api-token.guard';

@UseGuards(AuthGuard)
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  createToken() {
    return this.tokenService.createToken();
  }

  @Get('/:idToken')
  isTokenValid(@Param('idToken') id: string) {
    return this.tokenService.isTokenValid(id);
  }

  @Patch('/reduce/:idToken')
  reduceReqLeft(@Param('idToken') id: string) {
    return this.tokenService.reduceReqLeft(id);
  }

}
