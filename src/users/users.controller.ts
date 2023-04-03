import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Controller('v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(+id);
  }

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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBody({
    type: UpdateUserDto,
    description: 'Update user  by id',
    examples: {
      one: {
        summary: 'Update user with this data, this example is id:10',
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
      two: {
        summary: 'Update user with this data, this example is id:12',
        value: {
          id: 12,
          first_name: 'Camilo',
          last_name: 'López',
          date_birth: '24/03/1997',
          email: 'santiagolopezamaya@hotmail.com',
          password: '123456',
          mobile_pho: '3217654321',
          address: 'AV 321',
        } as UpdateUserDto,
      },
    },
  })
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(+id);
  }
}
