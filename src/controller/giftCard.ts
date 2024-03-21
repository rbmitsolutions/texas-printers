//actions
import { print } from "../actions/print";

//templates
import giftcardTemplate from "../templates/giftcardTemplate";

//interface
import { IGiftCardMessage } from "../interface/message";

export const printGiftCard = async (message: IGiftCardMessage) => {
    const template = giftcardTemplate(message)

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