import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should connect to database', async () => {
    expect(prismaService.$connect).toBeDefined();
    await expect(prismaService.$connect()).resolves.not.toThrow();
    await expect(prismaService.$disconnect()).resolves.not.toThrow();
  });
  it('should disconnect from database', async () => {
    await prismaService.$connect();
    expect(prismaService.$disconnect).toBeDefined();
    await expect(prismaService.$disconnect()).resolves.not.toThrow();
  });
  it('should enable shutdown hooks', async () => {
    const app = {} as INestApplication;
    expect(prismaService.enableShutdownHooks).toBeDefined();
    await expect(prismaService.enableShutdownHooks(app)).resolves.not.toThrow();
  });
});
