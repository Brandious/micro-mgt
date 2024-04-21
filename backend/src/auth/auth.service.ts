import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.validateCredentials({
      username,
      password: pass,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    const tokens = await this.getTokens(user.id, user);

    return {
      ...tokens,
    };
  }

  async signUp(username: string, pass: string, email: string) {
    const user = await this.usersService.create({
      username,
      email: email,
      password: pass,
    });

    if (!user) {
      throw new InternalServerErrorException();
    }
    delete user.password;
    return user;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, user: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          ...user,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          ...user,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.usersService.findOneById(id);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
    };
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }
}
