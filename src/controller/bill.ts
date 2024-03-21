//actions
import { print } from "../actions/print";

//templates
import billTemplate from "../templates/billTemplate";

//interface
import { IBillMessage } from "../interface/message";

export const printBill = async (message: IBillMessage) => {
    const template = billTemplate(message)
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