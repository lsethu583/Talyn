// Mirrors the Prisma `Role` enum so application code doesn't import
// generated Prisma types everywhere. A user can hold multiple roles.
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MENTOR = 'MENTOR',
  EXPERT = 'EXPERT',
}
