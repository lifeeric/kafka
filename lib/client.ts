/** @format */

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-node",
  brokers: ["192.168.21.50:9092"],
});

export { kafka };
