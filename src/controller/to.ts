//actions
import { print } from "../actions/print";

//templates
import orderControllerTemplate from "../templates/orderControllerTemplate";

//interface
import { IToMessage } from "../interface/message";

export const printTo = async (message: IToMessage) => {
    const template = orderControllerTemplate(message?.order_controller?.orders, message?.table, message?.order_controller?.number)

    try {
        await print(message.ip, template);
    } catch (error) {
        console.log(
            `=================== Printer ${message?.ip} is offline ===================`
        );
    }
}