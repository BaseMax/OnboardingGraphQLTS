import {
  EmailModule,
  EncryptionModule,
  EnvironmentConfigModule,
  PrismaModule,
  stubRegisterInput,
  stubUser,
} from '@infrastructure';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy } from 'jest-mock-extended';
import { UserModule, UserService } from '../user';
import { AuthModule } from './auth.module';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: MockProxy<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EnvironmentConfigModule,
        AuthModule,
        PrismaModule,
        UserModule,
        EncryptionModule,
        EmailModule,
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should be defined', () => {
      expect(authService.register).toBeDefined();
    });

    it('should throw error: user already exist with phone/email', () => {
      jest
        .spyOn(userService, 'findOneByEmailOrPhone')
        .mockResolvedValue(stubUser);

      expect(authService.register(stubRegisterInput)).rejects.toThrow();
    });

    it.todo('should create user successfully');
  });

  describe('login', () => {
    it.todo('should throw error: no user with this credentials');
    it.todo('should throw error: wrong password');
    it.todo('should successfully login');
  });
});
