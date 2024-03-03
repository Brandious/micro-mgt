import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './strategies/accessToken.guard';
import { RefreshTokenGuard } from './strategies/refreshToken.guard';
import { HasRoles } from './decorators/has-roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from './strategies/roles.guard';

// TODO: FIX THIS TYPING
export interface RequestWithUser extends Request {
  user: {
    sub: any;
    // add other properties as needed
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  signUp(@Body() signUpDto: any) {
    return this.authService.signUp(
      signUpDto.username,
      signUpDto.password,
      signUpDto.email,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: RequestWithUser) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: RequestWithUser) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @HasRoles(Role.MANAGER, Role.USER)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
