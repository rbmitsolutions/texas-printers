//actions
import { print } from "../actions/print";

//templates
import giftcardTemplate from "../templates/giftcardTemplate";

//interface
import { IBillMessage, IGiftCardBalanceMessage } from "../interface/message";
import giftCardBalanceTemplate from "../templates/giftCardBalanceTemplate";

export const printGiftCardBalance = async (message: IGiftCardBalanceMessage) => {

    const template = giftCardBalanceTemplate(message)

    try {
        await print(message?.ip, template);
    } catch (error) {
        console.log(
            `=================== Printer ${message?.ip} is offline ===================`
        );
    }
}