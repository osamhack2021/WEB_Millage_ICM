import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Result, ResultObject} from '../common/common.interface';
import {Repository} from 'typeorm';
import {MessageEntity} from './message.entity';
import {MessageBoxData, MessageData} from './message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async getMessageBoxes(id: number) : Promise<MessageBoxData[]> {
    const messageboxes = await this.messageRepository.query(`
      select t.id, t.message, t.senderId, t.anonymous,t.createdAt, u.fullname as fullname
        from message t
          inner join ( select senderId, max(createdAt) as MaxDate 
            from message where receiverId = ${id} group by senderId ) tm
            on t.senderId = tm.senderId and t.createdAt = tm.MaxDate
            inner join user u on u.id = t.senderId`);

    const result : MessageBoxData[] = await messageboxes.map((mb) => {
      let name = mb.fullname;
      if (mb.anonymous) {
        name = '익명';
      }
      return {
        id: mb.id,
        senderId: +mb.senderId,
        senderName: name,
        message: mb.message,
        time: mb.createdAt,
      };
    });

    return result;
  }

  async getMessages(receiverId: number, senderId: number): Promise<MessageData[]> {
    const messages = await this.messageRepository.find({
      where: [
        {
          receiverId: receiverId,
          senderId: senderId,
        },
        {
          receiverId: senderId,
          senderId: receiverId,
        },
      ],
      relations: ['sender', 'receiver'],
      order: {
        createdAt: 'DESC',
      },
    });

    const result : MessageData[] = await messages.map((m) => {
      let name = m.sender.fullname;
      if (m.anonymous) {
        name = '익명';
      }
      return {
        id: m.id,
        senderId: m.sender.id,
        receiverId: m.receiver.id,
        senderName: name,
        message: m.message,
        time: m.createdAt,
      };
    });

    return result;
  }


  async sendMessage(receiverId: number, senderId: number, message: string, anonymous: boolean): Promise<ResultObject> {
    this.messageRepository.save({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      anonymous: anonymous,
    });

    return {
      result: Result.SUCCESS,
    };
  }
}
