/** @format */

import { kafka } from "./lib/client";

async function init(): Promise<void> {
  const admin = kafka.admin();
  console.log("[✅] Admin Connecting..");
  admin.connect();
  console.log("[✅] Admin Connected");

  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("[✅] Topic created.");

  console.log("[⚡️] Disconnecting..");
  await admin.disconnect();
}

init();
