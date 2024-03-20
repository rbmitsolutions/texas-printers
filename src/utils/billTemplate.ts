import { IBillMessage } from "../interface/message";
import { formatDate } from "./convertCentsToEuro";

const menuTypeLabels: { [key: string]: string } = {
  Starters: "=== Starters ===",
  "Main Course": "=== Main Course ===",
  Bar: "=== Bar ===",
  Sides: "=== Extra Sides ===",
  Desserts: "=== Desserts ===",
};

const menuTypes = [
  { type: "Starters", label: "=== Starters ===" },
  { type: "Main Course", label: "=== Main Course ====" },
  { type: "Sides", label: "=== Extra Sides ===" },
  { type: "Bar", label: "=== Bar ===" },
  { type: "Desserts", label: "=== Desserts ===" },
];

function centerTextIn28Chars(text: string) {
  const padding = 28 - text.length;
  const leftPadding = Math.floor(padding / 2);
  const rightPadding = Math.ceil(padding / 2);
  const centeredText =
    "=".repeat(leftPadding) + " " + text + " " + "=".repeat(rightPadding);
  return centeredText;
}

//option 1
const billTemplate = (data: IBillMessage) => {
  const fontBoldTitle = "\x1B\x21\x31";
  const fontSmall = "\x1B\x21\x26";

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
  print.push(`Table ${data?.table?.number}`);
  print.push(`\n`);
  print.push(`\n`);
  print.push(`Date: ${formatDate(new Date())}`);
  print.push(`\n`);
  print.push(`\n`);
  for (const menuType of menuTypes) {
    const ordersByType = data?.orders?.filter(
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
        print.push(`${order.quantity}  ${order.menu} `);
        if (order?.add_ons) {
          // Set a small font size for the description
          print.push(`\n`);
          print.push(`${fontSmall}`);
          order?.add_ons?.forEach((x) => print.push(` >>${x?.title} ${x.price > 0 ? `+${(x?.price / 100).toFixed(2)}` : ''}`));
          // Reset to the original font size
          const fontSizeLarge = "\x1B\x21\x31";
          print.push(`${fontSizeLarge}`);
        }
      }
    }
  }

  print.push(`\n`);
  print.push(`\n`);
  print.push(`\n`);
  print.push(`\n`);
  print.push(`\n`);
  print.push(`${centerTextIn28Chars(`Total: ${(data?.total / 100).toFixed(2)}`)}`);

  print.push(`
\n
\n
\n
`);

  return print.join("");
};

export default billTemplate;
