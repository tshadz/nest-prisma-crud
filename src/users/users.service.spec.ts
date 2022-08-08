import { Test, TestingModule } from '@nestjs/testing';
import { Console } from 'console';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  
  const userMockedData: CreateUserDto = {
    email: "example@email.com"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {

    it('should return an array of users', async() => {

      prisma.user.findMany = jest.fn().mockReturnValue([userMockedData]);

      const result = await service.findAll();

      expect(result).toEqual([userMockedData]);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.user.findMany).toHaveBeenCalledWith({"where": {"isActive": true}});
    })

  })
});
