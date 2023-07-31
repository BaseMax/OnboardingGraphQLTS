import {
  BcryptService,
  EmailModule,
  EncryptionModule,
  EnvironmentConfigModule,
  JwtService,
  PrismaModule,
  PrismaService,
  stubLoginInput,
  stubRegisterInput,
  stubUser,
} from '@infrastructure';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy } from 'jest-mock-extended';
import { UserModule, UserService } from '../user';
import { AuthModule } from './auth.module';
import { AuthToken } from './output';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: MockProxy<UserService>;
  let bcryptService: MockProxy<BcryptService>;
  let jwtService: MockProxy<JwtService>;
  let prisma: MockProxy<PrismaService>;

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
    prisma = module.get(PrismaService);
    bcryptService = module.get(BcryptService);
    jwtService = module.get(JwtService);
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
      jest.spyOn(prisma.user, 'create').mockResolvedValue(null);
      try {
        authService.register(stubRegisterInput);
      } catch (error) {
        expect(error).rejects.toThrowError('user already registered');
      }
    });

    it('should create user successfully', async () => {
      jest.spyOn(userService, 'findOneByEmailOrPhone').mockResolvedValue(null);
      jest.spyOn(prisma.user, 'create').mockResolvedValue(stubUser);
      const { token } = (await authService.register(
        stubRegisterInput,
      )) as AuthToken;

      expect(token).toBeTruthy();
    });
  });

  describe('login', () => {
    it('should throw error: wrong password', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(stubUser);
      jest.spyOn(bcryptService, 'compare').mockResolvedValue(false);
      await expect(authService.login(stubLoginInput)).rejects.toThrowError(
        'credentials are invalid',
      );
    });

    it('should throw error: no user with this credentials', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);
      await expect(authService.login(stubLoginInput)).rejects.toThrowError(
        'credentials are invalid',
      );
    });

    it('should successfully login: return token', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(stubUser);
      jest.spyOn(bcryptService, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'generateAccessToken').mockResolvedValue('token');

      const result = await authService.login(stubLoginInput);

      expect(result).toEqual({ token: 'token' });
    });
  });
});
