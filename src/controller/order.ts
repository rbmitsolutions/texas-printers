//actions
import { print } from "../actions/print";

//templates
import orderControllerTemplate from "../templates/orderControllerTemplate";

//interface
import { IPrintGroup, groupOrdersByIP } from "../utils/groupOrdersByIp";
import { IOrderMessage } from "../interface/message";

export const printOrder = async (message: IOrderMessage) => {
    const ordersByIp: IPrintGroup[] = groupOrdersByIP(message?.order_controller?.orders);
    const ipAndTemplate = ordersByIp?.map(group => {
        return {
            ip: group?.ip,
            data: orderControllerTemplate(group?.orders, message?.table, message?.order_controller?.number)
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