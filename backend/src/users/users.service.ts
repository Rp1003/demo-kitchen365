import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | null> {
    try {
      return this.usersRepository.findOne({ where: { username } });
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }

  async create(
    username: string,
    password: string,
    name: string,
  ): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.findOne(username);
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.usersRepository.create({
        username,
        name,
        password: hashedPassword,
      });

      return this.usersRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }
}
