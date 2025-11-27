import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post('/character')
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.createCharacter(createCharacterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id);
  }

  @Patch(':id/favorites/:locationId')
  async addFavorite(@Param('id') id: number,@Param('locationId') locationId: number) {
    return this.characterService.addFavorite(id, locationId);
  }

}
