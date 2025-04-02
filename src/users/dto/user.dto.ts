import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'ID of the user' })
  id: string;

  @ApiProperty({ description: 'Username of the user' })
  username: string;
}