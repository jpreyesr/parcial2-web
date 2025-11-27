import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
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
      if (!token || (!token.active && token.reqLeft <= 0)) {
        throw new NotFoundException(`Objeto no fue encontrado`)
      }
      return token;
    }
    catch(error){
      console.error('error buscando token', error);
      throw error; 
    }
  }


  async reduceReqLeft(id: number): Promise<{ message: string; token: Token }> {
    try {
      const token = await this.tokenRepository.findOneBy({ id });
      if (!token) {
        throw new NotFoundException(`Token con ID ${id} no fue encontrado`);
      }
      if (token.reqLeft <= 0) {
        throw new Error(`El token elegido ya no tiene solicitudes restantes`);
      }

      token.reqLeft -= 1;

      await this.tokenRepository.save(token);
  
      return { message: 'reqLeft reducido exitosamente', token };
    } catch (error) {
      console.error('error al reducir reqLeft:', error);
      throw error;
    }
  }

}
