import "express-async-errors";

import printerTemplate from "./utils/orderControllerTemplate";
import { IOrderController, ITable } from "./interface/restaurant/orders";
import { Kafka } from "kafkajs";
import { IPrintGroup, groupOrdersByIP } from "./utils/groupOrdersByIp";
import { print } from "./utils/print";
import { IMessageVariables, IOrderMessage, IToMessage } from "./interface/message";

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

        console.log(data)
        // if (data?.message?.type === 'order') {
        //   const message = data?.message as IOrderMessage
        //   const ordersByIp: IPrintGroup[] = groupOrdersByIP(message?.order_controller?.orders);
        //   const ipAndTemplate = ordersByIp?.map(group => {
        //     return {
        //       ip: group?.ip,
        //       data: printerTemplate(group?.orders, data?.message?.table, message?.order_controller?.number)
        //     }
        //   })

        //   for (const item of ipAndTemplate) {
        //     try {
        //       await print(item.ip, item.data);
        //     } catch (error) {
        //       console.log(
        //         `=================== Printer ${item?.ip} is offline ===================`
        //       );
        //     }
        //   }
        // }

        // if (data?.message?.type === 'to') {
        //   const message = data?.message as IToMessage

        //   const template = printerTemplate(message?.order_controller?.orders, message?.table, message?.order_controller?.number)

        //   try {
        //     await print(message.ip, template);
        //   } catch (error) {
        //     console.log(
        //       `=================== Printer ${message?.ip} is offline ===================`
        //     );
        //   }
        // }


        // if(data?.message?.type ==='bill'){
        //   const message = data?.message as IToMessage

        // }



      } catch (error) {
        console.error("Erro ao analisar JSON:", error);
      }
    },
  });
};

kafkaRun();
