//utils
import { centerTextIn28Chars } from "./utils";
import { formatDate } from "../utils/convert";

//interfaces
import { IGiftCardMessage } from "../interface/message";

const giftcardTemplate = (data: IGiftCardMessage) => {
    const fontBoldTitle = "\x1B\x21\x31";

    const print = [
        `
    ${fontBoldTitle}
    Texas Steakour Restaurant`
    ];
    print.push(`\n`);
    print.push(`\n`);
    print.push(`\n`);
    print.push('116 O Connell Street');
    print.push(`\n`);
    print.push(`\n`);
    print.push('Limerick');
    print.push(`\n`);
    print.push(`\n`);
    print.push('Ireland');
    print.push(`\n`);
    print.push(`\n`);
    print.push(`\n`);
    print.push(`Date: ${formatDate(new Date())}`);
    print.push(`\n`);
    print.push(`\n`);
    print.push(`${centerTextIn28Chars(` Gift Card `)}`);
    print.push(`\n`);
    print.push(`\n`);
    print.push(`Code: ${data?.code}`);
    print.push(`\n`);
    print.push(`\n`);
    print.push(`${centerTextIn28Chars(`Total: ${(data?.total / 100).toFixed(2)}`)}`);
    print.push(fontBoldTitle)
    print.push(`
\n
\n
\n
`);

    return print.join("");
};

export default giftcardTemplate;
