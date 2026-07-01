import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../user-registered.event';
import { PrismaService } from '../../database/prisma.service';

// User Registered -> Event -> Listeners -> Create Profile (this one)
@Injectable()
export class CreateProfileListener {
  constructor(private readonly prisma: PrismaService) {}

  @OnEvent('user.registered')
  async handle(event: UserRegisteredEvent) {
    await this.prisma.profile.create({
      data: { userId: event.userId, name: event.name },
    });
  }
}
