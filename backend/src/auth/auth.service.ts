import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }

  async login(user: any) {

    try {
      const payload = { username: user.username, sub: user.id };
      const userData = await this.usersService.findOne(user.username);
      const validateLogin = await this.validateUser(user.username, user.password)
      
      if (validateLogin === null) {
        throw new NotFoundException('Invalid credentials. Please check your username and password.');
      }

      if (userData) {
        return {
          access_token: this.jwtService.sign(payload),
          userData,
        };
      }
      else {
        throw new NotFoundException(`user not found`);
      }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  async register(username: string, password: string, name: string) {
    try {
      const user = await this.usersService.create(username, password, name);
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }
}
