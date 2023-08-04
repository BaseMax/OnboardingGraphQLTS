import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  PrismaService,
  stubLoginInput,
  stubRegisterInput,
} from '../src/infrastructure';

describe('AUTH GraphQL (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('login mutation', () => {
    it('should return a token if the credentials are valid', async () => {
      const { email, password } = stubRegisterInput;

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              register(
                registerInput: {
                  f_name: "${stubRegisterInput.f_name}"
                  l_name: "${stubRegisterInput.l_name}"
                  email: "${stubRegisterInput.email}"
                  phone: "${stubRegisterInput.phone}"
                  post_code: "${stubRegisterInput.post_code}"
                  country: "${stubRegisterInput.country}"
                  address_detail: "${stubRegisterInput.address_detail}"
                  language: ["${stubRegisterInput.language[0]}"]
                  password: "${stubRegisterInput.password}"
                }
              ) {
                token
              }
            }
          `,
        });
      expect(res.body?.data.register.token).toBeTruthy();
      expect(typeof res.body?.data.register.token).toBe('string');

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              login(loginInput: { email: "${email}", password: "${password}" }) {
                token
              }
            }
          `,
        })
        .expect(200);

      expect(response.body.data.login.token).toBeDefined();
      await prisma.user.deleteMany();
    });

    it('should return an error if the credentials(user not exist) are invalid', async () => {
      const { email, password } = stubLoginInput;
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              login(loginInput: { email: "${email}", password: "${password}" }) {
                token
              }
            }
          `,
        })
        .expect(200);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toEqual(
        'credentials are invalid',
      );
      await prisma.user.deleteMany();
    });
  });

  describe('register mutation', () => {
    it("should return error if input doesn't meet validation", async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              register(
                registerInput: {
                  f_name: "${stubRegisterInput.f_name}"
                  l_name: "${stubRegisterInput.l_name}"
                  email: "${stubRegisterInput.email}"
                  phone: "${stubRegisterInput.phone}"
                  post_code: "${stubRegisterInput.post_code}"
                  country: "${stubRegisterInput.country}"
                  
                  language: ["${stubRegisterInput.language[0]}"]
                  password: "${stubRegisterInput.password}"
                }
              ) {
                token
              }
            }
          `,
        })
        .expect(400);

      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].message).toBe(
        "Your query doesn't match the schema. Try double-checking it!",
      );
    });
    it('should successfully return token', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              register(
                registerInput: {
                  f_name: "${stubRegisterInput.f_name}"
                  l_name: "${stubRegisterInput.l_name}"
                  email: "${stubRegisterInput.email}"
                  phone: "${stubRegisterInput.phone}"
                  post_code: "${stubRegisterInput.post_code}"
                  country: "${stubRegisterInput.country}"
                  address_detail : "${stubRegisterInput.address_detail}",
                  language: ["${stubRegisterInput.language[0]}"]
                  password: "${stubRegisterInput.password}"
                }
              ) {
                token
              }
            }
          `,
        })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      expect(typeof res.body.data.register.token).toBe('string');
    });

    it('should return error: phone/email has already taken', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              register(
                registerInput: {
                  f_name: "${stubRegisterInput.f_name}"
                  l_name: "${stubRegisterInput.l_name}"
                  email: "${stubRegisterInput.email}"
                  phone: "${stubRegisterInput.phone}"
                  post_code: "${stubRegisterInput.post_code}"
                  country: "${stubRegisterInput.country}"
                  address_detail : "${stubRegisterInput.address_detail}",
                  language: ["${stubRegisterInput.language[0]}"]
                  password: "${stubRegisterInput.password}"
                }
              ) {
                token
              }
            }
          `,
        })
        .expect(200);

      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].message).toBe('user already registered');
      await prisma.user.deleteMany();
    });
  });

  describe('resend verification email', () => {
    it('should resend email successfully', async () => {
      const user = await prisma.user.create({
        data: { ...stubRegisterInput, email_verified: true },
      });
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              resendVerificationToken(email: "${user.email}") {
                message
                email_sent
              }
            }
          `,
        })
        .expect(200);

      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].message).toBe('user already verified');
      expect(res.body.data).toBeNull();

      await prisma.user.deleteMany();
    });

    it('should resend email successfully', async () => {
      const user = await prisma.user.create({
        data: stubRegisterInput,
      });

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              resendVerificationToken(email: "${user.email}") {
                message
                email_sent
              }
            }
          `,
        })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      expect(res.body?.data.resendVerificationToken.email_sent).toBe(true);

      await prisma.user.deleteMany();
    });
  });
});
