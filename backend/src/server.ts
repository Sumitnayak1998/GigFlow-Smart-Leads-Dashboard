import { setServers } from "node:dns/promises";

try {
  setServers(["1.1.1.1", "8.8.8.8"]);
} catch (e) {
  console.warn("Failed to set DNS servers:", e);
}

import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(Number(env.port), () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();
