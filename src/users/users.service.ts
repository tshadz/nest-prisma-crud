import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email } = createUserDto;
    return this.prisma.user.create({
      data: {
        name,
        email
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      where: {
        isActive: true
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        id: id
      }
    });;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, email } = updateUserDto;
    return this.prisma.user.update({
      data:{
        name: name,
        email: email
      },
      where: {
        id: id,
      }
    });
  }

  async deactivateUser(id: number) {
    return this.prisma.user.update({
      data:{
        isActive: false,
      },
      where: {
        id: id,
      }
    });
  }

  async activateUser(id: number) {
    return this.prisma.user.update({
      data:{
        isActive: true,
      },
      where: {
        id: id,
      }
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    });
  }
}
