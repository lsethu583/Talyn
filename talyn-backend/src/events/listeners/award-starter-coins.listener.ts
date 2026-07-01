import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../user-registered.event';

// User Registered -> Event -> Listeners -> Award Starter Coins (this one)
// Phase 1 stub — wires into the future Wallet module without AuthService
// ever knowing a wallet exists.
@Injectable()
export class AwardStarterCoinsListener {
  private readonly logger = new Logger('AwardStarterCoinsListener');

  @OnEvent('user.registered')
  handle(event: UserRegisteredEvent) {
    this.logger.log(`Starter coins queued for user ${event.userId}`);
  }
}
