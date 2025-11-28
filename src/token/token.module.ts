import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { AuthGuard } from 'src/guards/api-token/api-token.guard';

@Module({
  controllers: [TokenController],
  providers: [TokenService, AuthGuard],
  imports: [TypeOrmModule.forFeature([Token])],
  exports: [TokenService, AuthGuard],
})
export class TokenModule {}
