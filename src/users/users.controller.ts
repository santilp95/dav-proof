import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({
    type: CreateUserDto,
    description: 'Create user',
    examples: {
      one: {
        summary: 'Create user with this data',
        value: {
          id: 10,
          first_name: 'Santiago',
          last_name: 'López',
          date_birth: '24/03/1995',
          email: 'santiagolopezamaya@hotmail.com',
          password: '123456',
          mobile_pho: '3217654321',
          address: 'AV 123',
        } as CreateUserDto,
      },
    },
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiBody({
    description: 'Get Users',
  })
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  @ApiBody({
    description: 'Get Users By id',
  })
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.getUserById(id);
    return user;
  }

  @ApiBody({
    type: UpdateUserDto,
    description: 'Update user  by id',
    examples: {
      one: {
        summary: 'Update user with this data, this example is 10',
        value: {
          id: 10,
          first_name: 'Santiago',
          last_name: 'López',
          date_birth: '24/03/1995',
          email: 'santiagolopezamaya@hotmail.com',
          password: '123456',
          mobile_pho: '3217654321',
          address: 'AV 321',
        } as UpdateUserDto,
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBody({
    description: 'Delete Users By id',
  })
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(+id);
  }
}
