import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Character } from 'src/character/entities/character.entity';
import { TokenModule } from 'src/token/token.module';
import { AuthGuard } from 'src/guards/api-token/api-token.guard';

@Module({
  controllers: [LocationController],
  providers: [LocationService, AuthGuard],
  imports: [TypeOrmModule.forFeature([Location, Character]), TokenModule],
  exports: [LocationService, AuthGuard],
})
export class LocationModule {}
