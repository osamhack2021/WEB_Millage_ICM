import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Result, ResultObject} from '../common/common.interface';
import {Repository, getConnection} from 'typeorm';
import {MessageEntity} from './message.entity';
import {MessageBoxData, MessageData} from './message.interface';

interface d {
  [key: number]: {
    id: number;
    senderId: number;
    senderName: string;
    message: string;
    time: string;
    unread?: number;
  };
}

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  private formatLocaleString(s: string) {
    const year = s.substr(s.lastIndexOf('/')+1, 4);
    const month = s.substring(0, s.indexOf('/'));
    const day = s.substring(s.indexOf('/')+1, s.lastIndexOf('/'));
    const time = s.substring(s.indexOf(',')+2, s.lastIndexOf(':'));
    const ampm = s.indexOf('AM') >= 0 ? '오전' : '오후';
    return `${year}. ${month}. ${day}. ${ampm} ${time}`;
  }

  async deleteMessages(receiverId: number, senderId: number) {
    await this.messageRepository.createQueryBuilder()
        .delete()
        .where([
          {
            receiverId: receiverId,
            senderId: senderId,
          },
          {
            receiverId: senderId,
            senderId: receiverId,
          },
        ])
        .execute();
  }

  // needs refactor
  async getMessageBoxes(id: number) : Promise<MessageBoxData[]> {
    const m :d = {};
    const output:MessageBoxData[] = [];
    const messageboxes = await this.messageRepository.query(`
      select t.id, t.message, u.nickname as nickname, t.senderId, t.anonymous,t.createdAt, u.fullname as fullname
        from message t
          inner join ( select senderId, max(createdAt) as MaxDate 
            from message where message != '' and receiverId = ${id} group by senderId ) tm
            on t.senderId = tm.senderId and t.createdAt = tm.MaxDate
            inner join user u on u.id = t.senderId order by t.createdAt DESC`);

    const sentOnlyMessageboxes = await this.messageRepository.query(`
      select t.id, t.message, u.nickname as nickname, t.receiverId as senderId, t.anonymous,t.createdAt, u.fullname as fullname
        from message t
          inner join ( select receiverId as senderId, max(createdAt) as MaxDate 
            from message where message != '' and senderId = ${id} group by receiverId ) tm
            on t.receiverId = tm.senderId and t.createdAt = tm.MaxDate
            inner join user u on u.id = t.receiverId order by t.createdAt DESC`);

    const notReadCnt = await this.messageRepository.query(`
      select senderId, count(*) as cnt from message where receiverId = ${id} and message.read = false group by senderId
    `);

    await messageboxes.map((mb) => {
      let name = mb.nickname;
      if (mb.anonymous) {
        name = '익명';
      }
      const data = {
        id: mb.id,
        senderId: +mb.senderId,
        senderName: name,
        message: mb.message,
        time: mb.createdAt,
      };
      m[mb.senderId] =data;
      return data;
    });

    await sentOnlyMessageboxes.map((mb) => {
      let name = mb.nickname;
      if (mb.anonymous) {
        name = '익명';
      }
      const data = {
        id: mb.id,
        senderId: +mb.senderId,
        senderName: name,
        message: mb.message,
        time: mb.createdAt,
      };
      if (!m[mb.senderId]) {
        m[mb.senderId] = data;
      } else if (m[mb.senderId].time < mb.createdAt) {
        m[mb.senderId] = data;
      }
      return data;
    });

    await notReadCnt.map((c) => {
      m[c.senderId].unread = c.cnt;
    });

    for (const key in m) {
      if (m.hasOwnProperty(key)) {
        output.push(m[key]);
      }
    }

    await output.sort((a: MessageBoxData, b: MessageBoxData) : number=> {
      if (a.time < b.time) {
        return 1;
      } else if (a.time > b.time) {
        return -1;
      }

      return 0;
    });

    return output;
  }

  async setMessagesAsRead(receiverId: number, senderId: number) : Promise<ResultObject> {
    await getConnection()
        .createQueryBuilder()
        .update('message')
        .set({read: true})
        .where({
          receiverId: receiverId,
          senderId: senderId,
        })
        .execute();

    return {
      result: Result.SUCCESS,
    };
  }

  async getMessages(receiverId: number, senderId: number): Promise<MessageData[]> {
    await getConnection()
        .createQueryBuilder()
        .update('message')
        .set({read: true})
        .where({
          receiverId: receiverId,
          senderId: senderId,
        })
        .execute();

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
        createdAt: 'ASC',
      },
    });

    const result : MessageData[] = await messages.map((m) => {
      let name = m.sender.nickname;
      if (m.anonymous) {
        name = '익명';
      }

      return {
        id: m.id,
        senderId: m.sender.id,
        receiverId: m.receiver.id,
        senderName: name,
        message: m.message,
        time: this.formatLocaleString(m.createdAt.toLocaleString()),
      };
    });

    return result;
  }


  async sendMessage(receiverId: number, senderId: number, message: string, anonymous: boolean): Promise<ResultObject> {
    await this.messageRepository.save({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      anonymous: anonymous,
    });

    return {
      result: Result.SUCCESS,
    };
  }

  async getUnreadMessageCount(id: number) {
    const cnt = await this.messageRepository.count({
      where: {
        receiverId: id,
        read: false,
      },
    });

    return cnt;
  }
}
