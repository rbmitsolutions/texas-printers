//utils
import { centerTextIn28Chars, menuTypeLabels, menuTypes } from "./utils";

//interface
import { IOrder, ITable } from "../interface/restaurant/orders";

//convert
import { getTimeFromDate } from "../utils/convert";

const orderControllerTemplate = (orders: IOrder[], table: ITable, orderControllerNumber: number) => {
  const fontBoldTitle = "\x1B\x21\x31";
  const fontBoldBiggerTitle = "\x1B\x21\x34"
  const fontSmall = "\x1B\x21\x24";

  const lineSpacing = "\x1B\x33\x60"

  const print = [
    `
${lineSpacing}



${fontBoldBiggerTitle}
T - ${table?.number}   [${table?.guests_booked}]   ${getTimeFromDate(new Date())}
${table?.meal_status === 'all together' ? 'All Together' : ''}
`,
  ];
  for (const menuType of menuTypes) {
    const ordersByType = orders?.filter(
      (o) => o.mn_section === menuType.type
    );

    if (ordersByType && ordersByType.length) {
      print.push(`${fontBoldTitle}`);
      print.push(`\n`);
      print.push(`${centerTextIn28Chars(menuTypeLabels[menuType.type])}`);
      print.push(`\n`);
      for (const order of ordersByType) {
        print.push(`${order.quantity}  ${order.menu_short_title}`);
        print.push(`\n`);
        print.push(`${fontBoldTitle}`);
        if (order?.add_ons?.length > 0) {
          // Set a small font size for the description
          print.push(`${fontSmall}`);
          order?.add_ons?.forEach((x) => {
            print.push(` >>${x?.title}`)
          });
          print.push(`\n`);
          print.push(`${fontBoldTitle}`);
          // Reset to the original font size
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
