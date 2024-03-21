//templates
import { openTill } from "../actions/openTill";

//interface
import { IOpenTillMessage } from "../interface/message";

export const printOpenTill = async (message: IOpenTillMessage) => {
    try {
        await openTill(message?.ip);
    } catch (error) {
        console.log(
            `=================== Printer ${message?.ip} is offline ===================`
        );
    }

}