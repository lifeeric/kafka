# Kafka

[![Watch the video](./thumbnail.png)](./preview.gif)

Kafka is distributed event-store annd stream processing platform. Kafka have Producer and Consumer. so let's see how it works.

I'll be using `bun` to run this project. which by default supports typescript.

### Setup

We'll be using docker to install kafka and zookeeper (auto-balancer) for this project.

Terminal 1:

```sh
docker run -p 2181:2181 zookeeper
```

Terminal 2 (replace PRIVATE_IP with your private IP address, can be found by ifconfig command):

```sh
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

#### Kafka Admin

Admin is used to create and delete topics. topics is similar like table in SQL.

```sh
bun run admin.ts
```

#### Kafka Producer

Producer is used to send messages to topics and produce messages. this producer will send out the message to SOUTH OR NORTH partion based on your input eg. `Eric NORTH` goes to `NORTH` partion.

```sh
bun run producer.ts
> Eric NORTH
```

#### Kafka Consumer

Consumer is used to consume messages from the topics. so open up a new terminal and run this command.

```sh
bun consumer.ts
```
