import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";

const server = app.listen(env.PORT, () => {
  console.log(
    `API running at http://localhost:${env.PORT}`,
  );
});

async function shutdown(
  signal: string,
): Promise<void> {
  console.log(`${signal} received. Shutting down.`);

  server.close(async () => {
    await prisma.$disconnect();

    process.exit(0);
  });
}

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});
