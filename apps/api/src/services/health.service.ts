import { prisma } from "../config/database.js";

export async function checkDatabaseHealth(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}
