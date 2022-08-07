import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const prismaServiceMock = {
    user: {
      update: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { 
          provide: PrismaService, 
          useValue: prismaServiceMock 
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
