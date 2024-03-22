//actions
import { print } from "../actions/print";

//templates
import orderControllerTemplate from "../templates/orderControllerTemplate";

//interface
import { IToMessage } from "../interface/message";
import { organizeOrder } from "../utils/organizeOrder";

export const printTo = async (message: IToMessage) => {
    const orders = organizeOrder(message?.order_controller?.orders)
    
    const template = orderControllerTemplate(orders|| [], message?.table, message?.order_controller?.number)

    try {
        await print(message.ip, template);
    } catch (error) {
        console.log(
            `=================== Printer ${message?.ip} is offline ===================`
        );
    }
}