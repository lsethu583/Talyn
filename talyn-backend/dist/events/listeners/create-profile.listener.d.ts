import { UserRegisteredEvent } from '../user-registered.event';
import { PrismaService } from '../../database/prisma.service';
export declare class CreateProfileListener {
    private readonly prisma;
    constructor(prisma: PrismaService);
    handle(event: UserRegisteredEvent): Promise<void>;
}
