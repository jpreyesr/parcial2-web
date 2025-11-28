import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { TokenModule } from 'src/token/token.module';
import { AuthGuard } from 'src/guards/api-token/api-token.guard';


@Module({
  controllers: [CharacterController],
  providers: [CharacterService, AuthGuard],
  imports: [TypeOrmModule.forFeature([Character, Location]), TokenModule],
  exports: [CharacterService, AuthGuard],
})
export class CharacterModule {}
