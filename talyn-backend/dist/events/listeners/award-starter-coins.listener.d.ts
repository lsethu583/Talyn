import { UserRegisteredEvent } from '../user-registered.event';
export declare class AwardStarterCoinsListener {
    private readonly logger;
    handle(event: UserRegisteredEvent): void;
}
