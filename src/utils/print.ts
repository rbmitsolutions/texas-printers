import net from "net";

export const print = (ip: string, data: string): Promise<void> => {
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
