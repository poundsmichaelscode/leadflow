import { prisma } from "../config/database.js";
export async function checkDatabaseHealth() {
    await prisma.$queryRaw `SELECT 1`;
}
//# sourceMappingURL=health.service.js.map