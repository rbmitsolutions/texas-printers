import "express-async-errors";
import net from "net";
import printerTemplate from "./utils/printerTemplate";
import { io } from "socket.io-client";
import { IOrderController, ITable } from "./interface/restaurant/orders";
import { PRINTERS } from "./utils/printers";
import { Kafka } from "kafkajs";

interface IMessage {
  message: {
    ip: string | "All";
    order_controller: IOrderController;
    table: ITable
  }
}

const print = (ip: string, data: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const printerPort = 9100;
    const cutPaperCommand = "\x1D\x56\x00";

    const client: net.Socket = net.createConnection(printerPort, ip, () => {
      console.log("Connected to printer");
    });

    client.on("error", (err) => {
      console.error(`Error connecting to the printer at IP: ${ip}`, err);
      client.end();
      reject(err);
    });

    client.on("connect", () => {
      console.log("Connected");

      client.write(data, () => {
        console.log("Printing...");
      });

      client.write(cutPaperCommand, "utf-8", () => {
        console.log("Cut");

        client.end();
        resolve(); // Resolve the promise when the printing is completed
      });
    });
  });
};

const selectPrinterAndOrders = async ({ message }: IMessage) => {
  if (message?.ip === "All") {
    for (let j = 0; j < PRINTERS.length; j++) {
      const printer = PRINTERS[j];

      const ordersToPrint = message?.order_controller?.orders?.filter(
        (order) => {
          // Check if the order type is included in the printer's list of types to print
          return printer.print.includes(order.type);
        }
      );

      const orderWithoutValueInDescription = ordersToPrint?.map((order) => {
        return {
          ...order,
          description: order?.description?.replace(/\+[^\€]*€/g, ""),
        };
      });

      if (
        orderWithoutValueInDescription &&
        orderWithoutValueInDescription.length > 0
      ) {
        const toPrint = printerTemplate({
          ...message?.order_controller,
          orders: orderWithoutValueInDescription,
        }, message?.table);

        try {
          console.log(toPrint)
          // printer in michael`s office
          // await print("192.168.1.26", toPrint);
          await print(printer.ip, toPrint);
        } catch (error) {
          console.log(
            `=================== Printer ${printer?.area} is offline ===================`
          );
        }
      }
    }
  } else {
    const printer = PRINTERS.find((printer) => printer.ip === message?.ip);

    const ordersToPrint = message?.order_controller?.orders?.filter((order) => {
      return printer?.print.includes(order.type);
    });

    const orderWithoutValueInDescription = ordersToPrint?.map((order) => {
      return {
        ...order,
        description: order?.description?.replace(/\+[^\€]*€/g, ""),
      };
    });

    if (
      orderWithoutValueInDescription &&
      orderWithoutValueInDescription.length > 0
    ) {
      const toPrint = printerTemplate({
        ...message?.order_controller,
        orders: orderWithoutValueInDescription,
      }, message?.table)

      try {
        console.log(toPrint)
        // printer in michael`s office
        // await print("192.168.1.26", toPrint);
        await print(message?.ip, toPrint);
      } catch (error) {
        console.log(
          `=================== Printer ${printer?.area} is offline ===================`
        );
      }
    }
  }
};

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
        // console.log(data)
        selectPrinterAndOrders(data);
      } catch (error) {
        console.error("Erro ao analisar JSON:", error);
      }
    },
  });
};

kafkaRun();

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
