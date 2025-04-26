import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseUserDto } from '../../users/dto/base-user.dto'

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({ description: 'Password of the user' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}