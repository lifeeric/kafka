/** @format */

import readline from "node:readline";

// Module
import { kafka } from "./lib/client";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init(): Promise<void> {
  const producer = kafka.producer();
  console.log("[✅] Producer Connecting..");

  await producer.connect();
  console.log("[✅] Producer Connected");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [riderName, location] = line.split(" ");
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLocaleLowerCase() == "north" ? 0 : 1,
          key: "location-updates",
          value: JSON.stringify({ name: riderName, location }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}

init();
