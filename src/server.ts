import "express-async-errors";

import printerTemplate from "./utils/printerTemplate";
import { IOrderController, ITable } from "./interface/restaurant/orders";
import { Kafka } from "kafkajs";
import { IPrintGroup, groupOrdersByIP } from "./utils/groupOrdersByIp";
import { print } from "./utils/print";

interface IMessage {
  message: {
    ip: string | "All";
    type: 'order' | 'bill';
    order_controller: IOrderController;
    table: ITable
  }
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
          const ordersByIp: IPrintGroup[] = groupOrdersByIP(data.message.order_controller.orders);
          const ipAndTemplate = ordersByIp?.map(group => {
            return {
              ip: group?.ip,
              data: printerTemplate(group?.orders, data?.message?.table, data?.message?.order_controller?.number)
            }
          })

          for (const item of ipAndTemplate) {
            try {
              await print(item.ip, item.data);
            } catch (error) {
              console.log(
                `=================== Printer ${item?.ip} is offline ===================`
              );
            }
          }
        }

        // selectPrinterAndOrders(data);
      } catch (error) {
        console.error("Erro ao analisar JSON:", error);
      }
    },
  });
};

kafkaRun();


// const selectPrinterAndOrders = async ({ message }: IMessage) => {
//   const printer = PRINTERS.find((printer) => printer.ip === message?.ip);

//   const ordersToPrint = message?.order_controller?.orders?.filter((order) => {
//     return printer?.print.includes(order.type);
//   });

//   const orderWithoutValueInDescription = ordersToPrint?.map((order) => {
//     return {
//       ...order,
//       description: order?.description?.replace(/\+[^\€]*€/g, ""),
//     };
//   });

//   if (
//     orderWithoutValueInDescription &&
//     orderWithoutValueInDescription.length > 0
//   ) {
//     const toPrint = printerTemplate({
//       ...message?.order_controller,
//       orders: orderWithoutValueInDescription,
//     }, message?.table)

//     try {
//       console.log(toPrint)
//       // printer in michael`s office
//       // await print("192.168.1.26", toPrint);
//       await print(message?.ip, toPrint);
//     } catch (error) {
//       console.log(
//         `=================== Printer ${printer?.area} is offline ===================`
//       );
//     }
//   }
//   // if (message?.ip === "All") {
//   //   for (let j = 0; j < PRINTERS.length; j++) {
//   //     const printer = PRINTERS[j];

//   //     const ordersToPrint = message?.order_controller?.orders?.filter(
//   //       (order) => {
//   //         // Check if the order type is included in the printer's list of types to print
//   //         return printer.print.includes(order.type);
//   //       }
//   //     );

//   //     const orderWithoutValueInDescription = ordersToPrint?.map((order) => {
//   //       return {
//   //         ...order,
//   //         description: order?.description?.replace(/\+[^\€]*€/g, ""),
//   //       };
//   //     });

//   //     if (
//   //       orderWithoutValueInDescription &&
//   //       orderWithoutValueInDescription.length > 0
//   //     ) {
//   //       const toPrint = printerTemplate({
//   //         ...message?.order_controller,
//   //         orders: orderWithoutValueInDescription,
//   //       }, message?.table);

//   //       try {
//   //         console.log(toPrint)
//   //         // printer in michael`s office
//   //         // await print("192.168.1.26", toPrint);
//   //         await print(printer.ip, toPrint);
//   //       } catch (error) {
//   //         console.log(
//   //           `=================== Printer ${printer?.area} is offline ===================`
//   //         );
//   //       }
//   //     }
//   //   }
//   // } else {

//   // }
// };


//teste de conexao com impressora
// const printerPort = 9100;
// const cutPaperCommand = "\x1D\x56\x00";

// const client: net.Socket = net.createConnection(
//   printerPort,
//   "192.168.1.26",
//   () => {
//     console.log("Connected to printer");
//   }
// );

// client.on("error", (err) => {
//   console.error("Error connecting to the printer: ", err);
//   client.end();
// });

// client.on("connect", () => {
//   console.log("Connected to printer");

//   client.write(    `
//         Texas
//         Texas
//         Texas
//         Texas
//         Texas
//         Texas
//         Texas
//         Texas
//         Texas
//         Texas
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//         \n
//       `,
//     () => {
//       console.log("Printing...");
//     }
//   );

//   client.write(cutPaperCommand, "utf-8", () => {
//     console.log("Paper cut command sent.");

//     client.end();
//   });
// });
