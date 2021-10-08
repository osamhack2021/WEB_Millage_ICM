import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import {MessageService} from '../message/message.service';

import {Server, Socket} from 'socket.io';

interface connection{
  [key: number]: Socket;
}

@WebSocketGateway({transports: ['websocket']})
export class EventsGateway implements OnGatewayConnection {
  private connectedUsers : connection = {};
  constructor(private readonly messageService: MessageService) {}

    @WebSocketServer()
    server: Server;

    async updateUnreadHeader(): Promise<boolean> {
      console.log('emit updateUnread');
      this.server.emit('updateUnread');
      return true;
    }

    async handleConnection() {
      console.log('a user has connected');
    }

    @SubscribeMessage('subscribe')
    handleEvent(@MessageBody() data: any,
    @ConnectedSocket() client: Socket) {
      console.log('a user has subscribed');
      this.connectedUsers[data.id] = client;
    }

    @SubscribeMessage('msgToServer')
    async handleMessage(@MessageBody() data: any) {
      const res = {
        message: data.message,
        senderId: data.senderId,
        receiverId: data.receiverId,
        anonyomus: data.anonymous,
        time: data.time,
      };

      await this.messageService.sendMessage(+data.receiverId, +data.senderId, data.message, data.anonymous);

      if (this.connectedUsers[data.receiverId]) {
        this.connectedUsers[data.receiverId].emit('msgToClient', res);
        this.connectedUsers[data.receiverId].emit('updateUnread');
      }
    }
}
