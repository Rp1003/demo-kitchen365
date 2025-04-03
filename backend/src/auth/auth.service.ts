import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const userData = await this.usersService.findOne(user.username);
    console.log("🚀 -----------------------🚀")
    console.log("🚀 ~ userData:", userData)
    console.log("🚀 -----------------------🚀")
    if(userData){
      return {
        access_token: this.jwtService.sign(payload),
        userData,
      };
    }
    else{
      throw new NotFoundException(`user not found`);
    }
    
  }

  async register(username: string, password: string, name: string) {
    
    const user = await this.usersService.create(username, password, name);
    const { password: _, ...result } = user;
    return result;
  }
}
