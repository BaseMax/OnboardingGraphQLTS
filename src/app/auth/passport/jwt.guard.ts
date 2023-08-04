import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { JwtService, PrismaService } from '@infrastructure';
import { Request } from 'express';
import { IJwtPayload } from '@domain';
import { GraphQLError } from 'graphql';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = this.extractToken(context);
    if (!token) {
      throw new GraphQLError('UnAuthorized');
    }
    try {
      const payload = (await this.jwtService.verifyAccessToken(
        token,
      )) as IJwtPayload;
      const user = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });
      this.attachPayload(context, user);
    } catch {
      throw new GraphQLError('UnAuthorized');
    }

    return true;
  }
  private attachPayload(c: ExecutionContext, payload: any) {
    if (c.getType<GqlContextType>() === 'graphql') {
      GqlExecutionContext.create(c).getContext().req.user = payload;
    } else {
      c.switchToHttp().getRequest().user = payload;
    }
  }

  private extractToken(c: ExecutionContext) {
    if (c.getType<GqlContextType>() === 'graphql') {
      return this.extractTokenFromHeader(
        GqlExecutionContext.create(c).getContext().req,
      );
    } else {
      return this.extractTokenFromHeader(c.switchToHttp().getRequest());
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
