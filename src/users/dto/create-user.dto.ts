/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}