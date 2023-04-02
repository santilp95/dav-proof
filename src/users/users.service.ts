import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const { email } = userData;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const newUser = await this.prisma.user.create({
      data: userData,
    });

    return newUser;
  }

  async findOneByMobilePhone(mobile_pho: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { mobile_pho } });
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, updateData: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: number) {
    this.prisma.user.delete({ where: { id } });
    return { message: `User with ID ${id} has been deleted.` };
  }
}
