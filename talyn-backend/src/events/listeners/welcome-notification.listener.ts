import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../user-registered.event';

// User Registered -> Event -> Listeners -> Send Welcome Notification (this one)
// Phase 1 stub: logs only. Swap the body for a real email/notification
// provider later without touching AuthService at all.
@Injectable()
export class WelcomeNotificationListener {
  private readonly logger = new Logger('WelcomeNotificationListener');

  @OnEvent('user.registered')
  handle(event: UserRegisteredEvent) {
    this.logger.log(`Welcome email queued for ${event.email}`);
  }
}
