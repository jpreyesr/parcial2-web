import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
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
        relations: ['favorites'], 
      });

      if (!character) {
        throw new NotFoundException(`Personaje con ID ${id} no fue encontrado`);
      }
      const location = await this.locationRepository.findOneBy({ id: locationId });

      if (!location) {
        throw new NotFoundException(`Locación con ID ${locationId} no fue encontrada`);
      }
      if (character.favPlaces.some(fav => fav.id === locationId)) {
        throw new Error(`La locación con ID ${locationId} ya está en los favoritos del personaje`);
      }

      character.favPlaces.push(location);

      return await this.characterRepository.save(character);
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      throw error;
    }
  }

  async calculateTaxes(id: number) {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: ['properties'], 
    });
  
    if (!character) {
      throw new NotFoundException(`Personaje con ID ${id} no fue encontrado`);
    }
  
    if (!character.property {
      return { taxDebt: 0 }; 
    }

    const COEF = character.employee? 0.08 : 0.03;

    const taxDebt = character.property * (1 + COEF);
  
    return { taxDebt }; 
  }

  async findOne(id: number) {
    try{
      const character = await this.characterRepository.findOneBy({id})
      if(!character){
        throw new NotFoundException(`Character no fue encontrado`)
      }
      return character;
    }
    catch(error){
      console.error('error buscando character', error);
      throw error; 
    }
  }

}
