import { Module } from '@nestjs/common';
import { CreateProfileListener } from './listeners/create-profile.listener';
import { WelcomeNotificationListener } from './listeners/welcome-notification.listener';
import { AwardStarterCoinsListener } from './listeners/award-starter-coins.listener';

@Module({
  providers: [CreateProfileListener, WelcomeNotificationListener, AwardStarterCoinsListener],
})
export class EventsModule {}
