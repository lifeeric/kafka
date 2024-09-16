/** @format */

import { kafka } from "./lib/client";

const groupId = process.argv[2] ?? "user-1";

async function init(): Promise<void> {
  const consumer = kafka.consumer({ groupId: groupId });

  await consumer.connect();
  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message, partition, topic }) => {
      console.log({
        groupId,
        topic,
        partition,
        key: message.key?.toString(),
        value: message.value?.toString(),
      });
    },
  });

  //   await consumer.disconnect();
}

init();
