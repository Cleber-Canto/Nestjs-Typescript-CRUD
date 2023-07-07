/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.create(createUserDto);
  return { message: 'Usuário criado com sucesso.', user };
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
  return { message: 'Lista de usuários encontrada.', users };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const user = this.usersService.findOne(id);
  if (user) {
    return { message: 'Usuário encontrado.', user };
  } else {
    return { message: 'Usuário não encontrado.' };
  }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(id, updateUserDto);
  if (user) {
    return { message: 'Usuário atualizado com sucesso.', user };
  } else {
    return { message: 'Usuário não encontrado.' };
  }
  } 

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): { message: string; } {
  const confirmationMessage = this.usersService.remove(id);
  return { message: confirmationMessage };
}
}