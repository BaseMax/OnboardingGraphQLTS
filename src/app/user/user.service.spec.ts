import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MockProxy } from 'jest-mock-extended';
import {
  stubRegisterInput,
  stubUser,
  PrismaService,
  PrismaModule,
} from '@infrastructure';
describe('UserService', () => {
  let userService: UserService;
  let prisma: MockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should be defined', () => {
      expect(userService.findByEmail).toBeDefined();
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(userService.create).toBeDefined();
    });

    it('should be able to create user', () => {
      jest.spyOn(prisma.user, 'create').mockResolvedValue(stubUser);
      const user = userService.create(stubRegisterInput);
      expect(user).toBeTruthy();
    });
  });

  describe('findOneByEmailOrPhone', () => {
    it('should be defined', () => {
      expect(userService.findOneByEmailOrPhone).toBeDefined();
    });
  });

  describe('findByEmail', () => {
    it('should be defined', () => {
      expect(userService.findByEmail).toBeDefined();
    });
  });
});
