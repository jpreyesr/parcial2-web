import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {}

  async createToken(createTokenDto: CreateTokenDto) {
    try {
        const token = this.tokenRepository.create(createTokenDto);
        await this.tokenRepository.save(token);
        return token;  
    } catch (error) {
      console.error('error creando token', error);
      throw error; 
    }
  }

  async findOne(id: number) {
    try{
      const token = await this.tokenRepository.findOneBy({id})
      if(!token){
        throw new NotFoundException(`Objeto no fue encontrado`)
      }
      return token;
    }
    catch(error){
      console.error('error buscando token', error);
      throw error; 
    }
  }


  async update(id: number, updateTokenDto : UpdateTokenDto) {
    try {
      const token = await this.tokenRepository.findOneBy({ id });
  
      if (!token) {
        throw new NotFoundException(`Objeto no fue encontrado`);
      }
      token.reqLeft -= 1;
  
      await this.tokenRepository.save(token);
    } catch (error) {
      console.error('Error al reducir:', error);
      throw error;
    }
  }

}
