import { Logger, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { WsAuthGuard } from 'src/auth/strategies/ws-auth.guard';
import { WSRolesGuard } from 'src/auth/strategies/ws-roles.guard';
import { Role } from 'src/enums/role.enum';

@WebSocketGateway()
export class WorkGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WorkGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Init');
  }

  // eslint-disable-next-line
  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }
  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('ping')
  @HasRoles(Role.USER)
  @UseGuards(WsAuthGuard, WSRolesGuard)
  handleMessage(client: Socket, payload: any) {
    try {
      this.logger.log(`Message received from client id: ${client.id}`);
      this.logger.debug(`Payload: ${payload}`);
      client.emit('pong', {
        message: 'pong',
      });
    } catch (err) {
      this.logger.log(err);
    }
  }
}
