import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {}

  async createToken() {
    const token = this.generateRandomToken();
    const newToken = this.tokenRepository.create({ token: token });
    return this.tokenRepository.save(newToken);
  }

  // async createToken() {
  //   const token = this.generateRandomToken();
  //   const newToken = this.tokenRepository.create({
  //     token,
  //     active: true,
  //     reqLeft: 10,
  //   });
  //   return this.tokenRepository.save(newToken);
  // }

  private generateRandomToken(): string {
    return Math.random().toString(36).substring(2, 18);
  }

  async isTokenValid(id: string): Promise<boolean> {
    try {
      const token = await this.tokenRepository.findOneBy({ id });
      if (token && token.active && token.reqLeft > 0) {
        return true; 
      }
      return false; 
    } catch (error) {
      console.error('Error verificando el token:', error);
      throw new NotFoundException(`Error verificando el token con ID: ${id}`);
    }
  }


  async reduceReqLeft(id: string): Promise<{ message: string; token: Token }> {
    try {
      const token = await this.tokenRepository.findOne({ where: { id } });
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
