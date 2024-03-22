import { IOrder } from "../interface/restaurant/orders";
import { organizeOrder } from "./organizeOrder";

export interface IPrintGroup {
    ip: string;
    orders: IOrder[];
}

export const groupOrdersByIP = (orders: IOrder[]): IPrintGroup[] => {
    const combinedOrdersArray = organizeOrder(Object.values(orders));

    const printGroups: { [ip: string]: IOrder[] } = {};

    combinedOrdersArray?.forEach(order => {
        order?.to_print_ips.forEach(ip => {
            if (!printGroups[ip]) {
                printGroups[ip] = [];
            }
            printGroups[ip].push(order);
        });
    });

    return Object.entries(printGroups).map(([ip, orders]) => ({ ip, orders }));
}


