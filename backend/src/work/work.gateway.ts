import { Logger, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@WebSocketGateway({
  namespace: '/',
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
})
export class WorkGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WorkGateway.name);

  private users = new Map();

  @WebSocketServer() io: Server;
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  afterInit() {
    this.logger.log('Init');
  }

  // eslint-disable-next-line
  handleConnection(client: any, ...args: any[]) {
    // const { sockets } = this.io.sockets;
    this.logger.log(`Client id: ${client.id} connected`);
    // this.logger.debug(`Number of connected clients: ${sockets.size}`);

    const userId = client.handshake.query.userId;

    this.usersRepository.update({ id: userId }, { status: 'online' });

    // Set up idle timeout
    this.users.set(client.id, {
      timeout: setTimeout(
        () => {
          // Set user status to 'idle' after 5 minutes of inactivity
          this.usersRepository.update({ id: userId }, { status: 'idle' });
        },
        5 * 60 * 1000,
      ),
    });
  }
  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
    const userId = client.handshake.query.userId;
    // Set user status to 'offline'
    this.usersRepository.update({ id: userId }, { status: 'offline' });

    // Clear idle timeout
    clearTimeout(this.users.get(client.id).timeout);
    this.users.delete(client.id);
  }

  @SubscribeMessage('ping')
  @HasRoles(Role.USER, Role.MANAGER)
  @UseGuards(WsAuthGuard, WSRolesGuard)
  handleMessage(client: Socket, payload: any) {
    try {
      this.logger.log(`Message received from client id: ${client.id}`);
      this.logger.debug(`Payload: ${payload}`);
      const userId = client.handshake.query.userId;
      // Clear the idle timeout and set it again
      clearTimeout(this.users.get(client.id).timeout);
      this.users.get(client.id).timeout = setTimeout(
        () => {
          // Set user status to 'idle' after 5 minutes of inactivity
          this.usersRepository.update(userId, { status: 'idle' });
        },
        5 * 60 * 1000,
      );

      client.emit('pong', {
        message: 'pong',
      });
    } catch (err) {
      this.logger.log(err);
    }
  }
}
