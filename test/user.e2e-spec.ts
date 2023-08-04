import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  PrismaService,
  stubRegisterInput,
  stubFormCreate,
} from '../src/infrastructure';
import { UserService } from '../src/app/user';
import { AuthService } from '../src/app/auth';
import { gql } from 'apollo-server-core';
describe('GraphQL (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userService: UserService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = app.get(PrismaService);
    userService = app.get(UserService);
    authService = app.get(AuthService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User - Get data', () => {
    it('should return error: UnAuthorized User', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          query {
            user(email: "example@mail.com") {
              address_detail
            }
          }`,
        })
        .expect(200);

      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].message).toBe('UnAuthorized');
    });
    it('should return null: no user with that input', async () => {
      const { token } = (await authService.register(stubRegisterInput)) as {
        token: string;
      };

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', 'Bearer ' + token)
        .send({
          query: `
          query {
            user(email: "example@mail.com") {
              address_detail
            }
          }`,
        })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      expect(res.body.data.user).toBeNull();
      await prisma.user.deleteMany();
    });

    it('should return user successfully', async () => {
      const { token } = (await authService.register(stubRegisterInput)) as {
        token: string;
      };

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', 'Bearer ' + token)
        .send({
          query: `
          query {
            user(email: "${stubRegisterInput.email}") {
                email
            }
          }`,
        })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      expect(res.body.data.user).not.toBeNull();
      expect(res.body.data.user.email).toBe(stubRegisterInput.email);
      await prisma.user.deleteMany();
    });

    it('should return user(with forms)', async () => {
      const { token } = (await authService.register(stubRegisterInput)) as {
        token: string;
      };

      // create a form
      const query = `
      mutation {
        createOrUpdateFrom(createFormInput: {
          field: "name",
          value: "ali",
          step: 1
        }) {
          id
          step
          value
          field
        }
      }`;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', 'Bearer ' + token)
        .send({ query })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      expect(res.body.data.createOrUpdateFrom).toEqual({
        id: expect.any(Number),
        step: 1,
        field: 'name',
        value: 'ali',
      });

      await prisma.user.deleteMany();
      await prisma.form.deleteMany();
    });
  });

  describe('create or update Form', () => {
    it.todo('should create a form');
    it.todo('should update a form for a user');
  });
});
