//actions
import { print } from "../actions/print";

//templates
import billTemplate from "../templates/billTemplate";

//interface
import { IBillMessage } from "../interface/message";
import { organizeOrder } from "../utils/organizeOrder";

export const printBill = async (message: IBillMessage) => {
    const orders = organizeOrder(message?.orders)
    
    // const organizeOrder = groupOrdersByIP(message?.order_controller?.orders)
    

    const template = billTemplate({
        ...message,
        orders
    })
    try {
        await print(message.ip, template,
            message?.transaction_method === 'cash' ? true : false
        );
    } catch (error) {
        console.log(
            `=================== Printer ${message?.ip} is offline ===================`
        );
    }
}