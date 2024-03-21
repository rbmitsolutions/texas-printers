//utils
import { centerTextIn28Chars, menuTypeLabels, menuTypes } from "./utils";

//interface
import { IOrder, ITable } from "../interface/restaurant/orders";

//convert
import { getTimeFromDate } from "../utils/convert";

const orderControllerTemplate = (orders: IOrder[], table: ITable, orderControllerNumber: number) => {
  const fontBoldTitle = "\x1B\x21\x31";
  const fontBoldBiggerTitle = "\x1B\x21\x34"
  const fontSmall = "\x1B\x21\x26";

  const print = [
    `
${fontBoldTitle}


Time: ${getTimeFromDate(new Date())},

Guests: ${table?.guests}

${fontBoldBiggerTitle}
Table: ${table?.number} - ${orderControllerNumber}
${fontBoldTitle}
`,
  ];

  print.push(`\n`);
  print.push(`\n`);
  print.push(table?.meal_status)
  print.push(`\n`);
  print.push(`\n`);

  for (const menuType of menuTypes) {
    const ordersByType = orders?.filter(
      (o) => o.mn_section === menuType.type
    );

    if (ordersByType && ordersByType.length) {
      print.push(`\n`);
      print.push(`\n`);
      print.push(`${fontBoldTitle}`);
      print.push(`${centerTextIn28Chars(menuTypeLabels[menuType.type])}`);
      for (const order of ordersByType) {
        print.push(`\n`);
        print.push(`\n`);
        print.push(`${fontBoldBiggerTitle}`);
        print.push(`${order.quantity}  ${order.menu_short_title}`);
        print.push(`${fontBoldTitle}`);
        if (order?.add_ons) {
          // Set a small font size for the description
          print.push(`\n`);
          print.push(`${fontSmall}`);
          order?.add_ons?.forEach((x) => print.push(` >>${x?.title}`));

          // Reset to the original font size
          print.push(`${fontBoldTitle}`);
        }
      }
    }
  }

  print.push(`
\n
\n
\n
`);

  return print.join("");
};

export default orderControllerTemplate;
