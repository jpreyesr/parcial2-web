import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/token')
  createToken(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.createToken(createTokenDto);
  }

  @Get('/token/:idToken')
  findOne(@Param('idToken') id: string) {
    return this.tokenService.findOne(+id);
  }

  @Patch('/token/reduce/:idToken')
  reduceReqLeft(@Param('idToken') id: string) {
    return this.tokenService.reduceReqLeft(+id);
  }

}
