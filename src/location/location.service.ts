import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from 'src/character/entities/character.entity';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const owner = await this.characterRepository.findOne({ where: { id: createLocationDto.ownerId } });
    if (!owner) {
      throw new NotFoundException('Owner character not found');
    }
    const newLocation = this.locationRepository.create({
      ...createLocationDto,
      owner,
    });
    return this.locationRepository.save(newLocation);
  }

  async findAll() {
    return await this.locationRepository.find({ relations: { favCharacters: true } });
  }

}
