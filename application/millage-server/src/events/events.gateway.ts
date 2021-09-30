import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server} from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
      return data;
    }
}
