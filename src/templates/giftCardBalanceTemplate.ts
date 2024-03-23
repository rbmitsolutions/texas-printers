import { centerTextIn28Chars, getOrderItemTotal, menuTypeLabels, menuTypes } from "./utils";

//interface 
import { IBillMessage, IGiftCardBalanceMessage } from "../interface/message";

//utils
import { formatDate, priceConverter } from "../utils/convert";

const giftCardBalanceTemplate = (data: IGiftCardBalanceMessage) => {
    const fontBoldTitle = "\x1B\x21\x31";
    const fontSmall = "\x1B\x21\x00";

    const print = [
        `
    ${fontBoldTitle}
    Texas Steakour Restaurant`
    ];
    print.push(`\n`);
    print.push(`\n`);
    print.push(fontSmall);
    print.push('116 O Connell Street');
    print.push(`\n`);
    print.push('Limerick');
    print.push(`\n`);
    print.push('Ireland');
    print.push(`\n`);
    print.push(`Date: ${formatDate(new Date())}`);
    print.push(`\n`);
    print.push(`\n`);
    print.push(fontBoldTitle)
    print.push(`${centerTextIn28Chars(` Gift Card `)}`);
    print.push(`\n`);
    print.push(`\n`);
    print.push(`Code: ${data?.code}`);
    print.push(`\n`);
    print.push(`\n`);
    print.push(fontSmall);
    print.push(`\n`);
    print.push('Balance: ');
    print.push(`\n`);
    print.push(fontBoldTitle)
    print.push(`${centerTextIn28Chars(`Total: ${(data?.balance / 100).toFixed(2)}`)}`);
    print.push(`\n`);
    print.push(`\n`);
    print.push(`${fontBoldTitle}`);

    print.push(`
\n
\n
\n
`);

    return print.join("");
};

export default giftCardBalanceTemplate;

