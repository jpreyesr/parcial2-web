import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class CharacterService {

  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ) {}

  async createCharacter(createCharacterDto: CreateCharacterDto) {
    try {
        const token = this.characterRepository.create(createCharacterDto);
        await this.characterRepository.save(token);
        return token; 
      
    } catch (error) {
      console.error('error creando el personaje', error);
      throw error; 
    }
  }

  async addFavorite(id: number, locationId: number): Promise<Character> {
    try {
      const character = await this.characterRepository.findOne({
        where: { id },
        relations: ['favPlaces'], 
      });

      if (!character) {
        throw new NotFoundException(`personaje no encontrado`);
      }
      const location = await this.locationRepository.findOneBy({ id: locationId });

      if (!location) {
        throw new NotFoundException(`locacion no encontrada`);
      }
      if (character.favPlaces.some(fav => fav.id === locationId)) {
        throw new Error(`la locación  ya está en los favoritos del personaje`);
      }

      character.favPlaces.push(location);

      return await this.characterRepository.save(character);
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      throw error;
    }
  }

  async findTaxesPerCharacter(id: number) {
    try{

      const character = await this.characterRepository.findOne({
        where: { id },
        relations: ['location'], 
      });
    
      if (!character) {
        throw new NotFoundException(`personaje no encontrado`);
      }
    
      if (!character.location) {
        return { taxDebt: 0 }; 
      }
  
      const COEF = character.employee? 0.08 : 0.03;
      const taxDebt = character.location.cost * (1 + COEF);
      return { taxDebt }; 
    } catch(error){
      console.error('error calculando taxes', error);
      throw error; 
    }
  }
}
