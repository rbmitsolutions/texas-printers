import { IOrder } from "../interface/restaurant/orders";

export interface IPrintGroup {
    ip: string;
    orders: IOrder[];
}

export const groupOrdersByIP = (orders: IOrder[]): IPrintGroup[] => {
    const printGroups: { [ip: string]: IOrder[] } = {};

    orders?.forEach(order => {
        order?.to_print_ips.forEach(ip => {
            if (!printGroups[ip]) {
                printGroups[ip] = [];
            }
            printGroups[ip].push(order);
        });
    });

    return Object.entries(printGroups).map(([ip, orders]) => ({ ip, orders }));
}