import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var prisma` in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
