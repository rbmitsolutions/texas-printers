import net from "net";

export const openTill = (ip: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const printerPort = 9100;
        const openTillCommand = "\x1B\x70\x00\x19\xFA";

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

                client.write(openTillCommand, "utf-8", () => {
                    console.log("Till opened");

                    client.end();
                    resolve(); // Resolve the promise when the printing is completed
                });
            });
    });
};
