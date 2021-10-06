import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import {MessageService} from '../message/message.service';

import {Server} from 'socket.io';

@WebSocketGateway(3001, {transports: ['websocket']})
export class EventsGateway implements OnGatewayConnection {
  constructor(private readonly messageService: MessageService) {}

    @WebSocketServer()
    server: Server;

    async handleConnection() {
      console.log('a user has connected');
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
      return data;
    }

    @SubscribeMessage('msgToServer')
    async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: any) {
      const res = {
        msg: data.msg,
        senderID: data.userID,
        time: new Date(client.handshake.time).toLocaleString(),
      };

      await this.messageService.sendMessage(1, 9, '1', true);

      this.server.emit('msgToClient', res);
    }
}
