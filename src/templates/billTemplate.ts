import { centerTextIn28Chars, getOrderItemTotal, menuTypeLabels, menuTypes } from "./utils";

//interface 
import { IBillMessage } from "../interface/message";

//utils
import { formatDate, priceConverter } from "../utils/convert";

const billTemplate = (data: IBillMessage) => {
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
  print.push(`Table ${data?.table?.number}`);
  print.push(`\n`);
  print.push(`Date: ${formatDate(new Date())}`);
  print.push(`\n`);
  print.push(fontBoldTitle)
  for (const menuType of menuTypes) {
    const ordersByType = data?.orders?.filter(
      (o) => o.mn_section === menuType.type
    );

    if (ordersByType && ordersByType.length) {
      print.push(`\n`);
      print.push(`\n`);
      print.push(`${fontBoldTitle}`);
      print.push(`${centerTextIn28Chars(menuTypeLabels[menuType.type])}`);
      print.push(`\n`);
      for (const order of ordersByType) {
        print.push(`\n`);
        print.push(fontSmall)
        print.push(`${order.quantity} ${order.menu} / ${getOrderItemTotal(order)}`);
        if (order?.add_ons?.length > 0) {
          // Set a small font size for the description
          print.push(`\n`);
          print.push(`${fontSmall}`);
          order?.add_ons?.forEach((x) => {
            print.push(` >>${x?.title}`)
            print.push(`\n`);
          });
          // Reset to the original font size
          print.push(`${fontBoldTitle}`);
        }
      }
    }
  }

  print.push(`\n`);
  print.push(`\n`);
  print.push(`${fontBoldTitle}`);
  print.push(`${centerTextIn28Chars(`Total: ${(data?.total / 100).toFixed(2)}`)}`);

  print.push(`
\n
\n
\n
`);

  return print.join("");
};

export default billTemplate;

