import { Kafka } from "kafkajs";
import "express-async-errors";

//controllers
import { printGiftCard } from "./controller/giftCard";
import { printOpenTill } from "./controller/openTill";
import { printOrder } from "./controller/order";
import { printBill } from "./controller/bill";
import { printTo } from "./controller/to";

//interfaces
import { IBillMessage, IGiftCardBalanceMessage, IGiftCardMessage, IMessageVariables, IOpenTillMessage, IOrderMessage, IToMessage } from "./interface/message";
import { printGiftCardBalance } from "./controller/giftCardBalance";

interface IMessage {
  message: IMessageVariables
}

const kafka = new Kafka({
  brokers: ["gentle-lynx-13118-eu1-kafka.upstash.io:9092"],
  sasl: {
    mechanism: "scram-sha-256",
    username: "Z2VudGxlLWx5bngtMTMxMTgkMSTHfsgFiZdNJ4v7oDNndXEj2QQeVhIR46ezuEg",
    password: "OGU4YjVlOWEtOTY4Yi00ZDk3LTllMGYtODJkOTI0OWU1ZWRi",
  },
  ssl: true,
});

const kafkaConsumer = kafka.consumer({
  groupId: "group_1",
});

const kafkaRun = async () => {
  await kafkaConsumer.connect();

  await kafkaConsumer.subscribe({
    topic: "Texas",
    fromBeginning: true,
  });

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message?.value as any) as IMessage;

        if (data?.message?.type === 'order') {
          await printOrder(data?.message as IOrderMessage)
        }

        if (data?.message?.type === 'to') {
          await printTo(data?.message as IToMessage)
        }

        if (data?.message?.type === 'bill') {
          await printBill(data?.message as IBillMessage)
        }

        if (data?.message?.type === 'gift-card') {
          await printGiftCard(data?.message as IGiftCardMessage)
        }

        if (data?.message?.type === 'open-till') {
          await printOpenTill(data?.message as IOpenTillMessage)
        }

        if(data?.message?.type === 'gift-card-balance') {
          await printGiftCardBalance(data?.message as IGiftCardBalanceMessage)
        }

      } catch (error) {
        console.error("Erro ao analisar JSON:", error);
      }
    },
  });
};

kafkaRun();
