import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { AuthRequest } from 'src/@types/auth.request.interface';
import { UserRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      throw new UnauthorizedException('Unauthorized access');
    }

    const [, token] = authToken.split(' ');

    try {
      const { email } = this.jwt.verify(token);

      const user = await this.userRepository.findByEmail(email);

      req.user_id = user.id;

      return next();
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
