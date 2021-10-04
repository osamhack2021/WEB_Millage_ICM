import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import {Server} from 'socket.io';

@WebSocketGateway(3001, {transports: ['websocket']})
export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    async handleConnection() {
      console.log('a user has connected');
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
      return data;
    }
}
