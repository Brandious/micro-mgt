import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class WSRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const token = context
      .switchToWs()
      .getClient()
      .handshake.headers.authorization.split(' ')[1];
    const user = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );

    console.log(user);
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
