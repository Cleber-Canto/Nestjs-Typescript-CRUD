/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityNotFoundError } from '../errors/entity-not-found.error';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create({ email, name, password }: CreateUserDto) {
    const currentMaxId = this.users[this.users.length - 1]?.id || 0;

    const id = currentMaxId + 1;
    const user: User = {
      id,
      email,
      name,
      password,
    };

    const userExists = this.users.find((user) => user.email === email);

    if (userExists) {
      return 'User already exists';
    }

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new EntityNotFoundError('User was not found.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    const newUser: User = {
      ...user,
      ...updateUserDto,
    };

    const findIndex = this.users.findIndex((user) => user.id === id);
    this.users[findIndex] = newUser;

    return newUser;
  }

  remove(id: number): string {
    const findIndex = this.users.findIndex((user) => user.id === id);
    if (findIndex !== -1) {
      this.users.splice(findIndex, 1);
      return "Usuário removido com sucesso.";
    } else {
      throw new NotFoundException('Usuário não encontrado.');
    }
  }
}