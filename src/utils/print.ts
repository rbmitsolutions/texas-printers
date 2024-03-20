import net from "net";

export const print = (ip: string, data: string, openTill?: boolean): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const printerPort = 9100;
        const cutPaperCommand = "\x1D\x56\x00";
        const openTillCommand = "\x1B\x70\x00\x19\xFA";

        const client: net.Socket = net.createConnection(printerPort, ip, () => {
            console.log("Connected to printer");
        });

        client.on("error", (err) => {
            console.error(`Error connecting to the printer at IP: ${ip}`, err);
            client.end();
            reject(err);
        });

        if (openTill) {
            client.on("connect", () => {
                console.log("Connected");

                client.write(data, () => {
                    console.log("Printing...");
                });

                client.write(cutPaperCommand, "utf-8", () => {
                    console.log("Cut");
                    client.end();
                    resolve(); // Resolve the promise when the printing is completed
                    // client.write(openTillCommand, "utf-8", () => {
                    //     console.log("Till opened");

                    //     client.end();
                    //     resolve(); // Resolve the promise when the printing is completed
                    // });
                });
            });
        } else {
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
        }
    });
};
