import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MessageEntity} from './message.entity';
import {MessageBoxData} from './message.interface';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async getMessageBoxes(id: number) : Promise<MessageBoxData[]> {
    const messageboxes = await this.messageRepository.find({
      where: {
        receiverId: id,
      },
      relations: ['sender'],
    });

    const result : MessageBoxData[] = await messageboxes.map((mb) => {
      let name = mb.sender.fullname;
      if (mb.anonymous) {
        name = '익명';
      }
      return {
        id: mb.id,
        senderId: mb.senderId,
        senderName: name,
        message: mb.message,
        time: mb.createdAt,
      };
    });

    return result;
  }
}
