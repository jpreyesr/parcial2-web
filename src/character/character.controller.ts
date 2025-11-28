import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { AuthGuard } from 'src/guards/api-token/api-token.guard';

@UseGuards(AuthGuard)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.createCharacter(createCharacterDto);
  }

  @Get(':id/taxes')
  taxesPerCharacter(@Param('id') id: string) {
    return this.characterService.findTaxesPerCharacter(+id);
  }

  @Patch(':id/favorites/:locationId')
  async addFavorite(@Param('id') id: number,@Param('locationId') locationId: number) {
    return this.characterService.addFavorite(id, locationId);
  }

}
