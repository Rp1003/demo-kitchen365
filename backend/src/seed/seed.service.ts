import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async createUser() {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash('password123', 10);

      // Create and save a default admin user
      const user = this.usersRepository.create({
        username: 'admin',
        password: hashedPassword
      });
      await this.usersRepository.save(user);

      Logger.log('Default user created: admin');
    } catch (error) {
      console.log(error.message)
      if (error.message.includes('already exists')) {
        Logger.log('Default user already exists');
      } else {
        Logger.error('Failed to create default user', error);
      }
    }
  }
}