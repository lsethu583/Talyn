import { UserRegisteredEvent } from '../user-registered.event';
export declare class WelcomeNotificationListener {
    private readonly logger;
    handle(event: UserRegisteredEvent): void;
}
