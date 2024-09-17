import { PrismaClient } from '@prisma/client';

declare module globalThis {
  let prisma: PrismaClient;
}

globalThis.prisma = new PrismaClient();
export const db = globalThis.prisma;
