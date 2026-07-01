import { Module } from '@nestjs/common';

// Intentionally minimal in Phase 1 — exists so the CreateProfileListener
// has a clear home, and so Phase 2 can grow this into a full module
// (controller, DTOs, service) without restructuring anything else.
@Module({})
export class ProfilesModule {}
