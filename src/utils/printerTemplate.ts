import { IOrderController, ITable } from "../interface/restaurant/orders";

const menuTypeLabels: { [key: string]: string } = {
  Starters: "=== Starters ===",
  "Main Course": "=== Main Course ===",
  "Kids Menu": "=== Kids Menu ===",
  Desserts: "=== Desserts ===",
  Sides: "=== Extra Sides ===",
  Bar: "=== Bar ===",
};

const menuTypes = [
  { type: "Starters", label: "=== Starters ===" },
  { type: "Main Course", label: "=== Main Course ====" },
  { type: "Kids Menu", label: "=== Kids Menu ===" },
  { type: "Desserts", label: "=== Desserts ===" },
  { type: "Sides", label: "=== Extra Sides ===" },
  { type: "Bar", label: "=== Bar ===" },
];

export const TABLE_MEAL_STATUS = [
  {
    status: "waiting",
    color: "orange",
    show: ["Desserts", "Bar"],
  },
  {
    status: "starters",
    color: "purple",
    show: ["Starters", "Extra Sides", "Sides", "Desserts", "Bar"],
  },
  {
    status: "main",
    color: "green",
    show: [
      "Main Course",
      "Kids Menu",
      "Sides",
      "Extra Sides",
      "Desserts",
      "Bar",
    ],
  },
  {
    status: "all together",
    color: "yellow",
    show: [
      "Starters",
      "Main Course",
      "Kids Menu",
      "Sides",
      "Extra Sides",
      "Desserts",
      "Bar",
    ],
  },
  {
    status: "clean table",
    color: "orange",
    show: [],
  },
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
const printerTemplate = (orderController: IOrderController, table: ITable) => {
  const fontBoldTitle = "\x1B\x21\x31";
  const fontBigTitle = "\x1B\x21\x38";
  const fontSmall = "\x1B\x21\x26";

  const print = [
    `
${fontBoldTitle}
Table: ${table?.number} - ${orderController?.number}

${centerTextIn28Chars(`PASS ${table?.pass}`)}
`,
  ];

  for (const menuType of menuTypes) {
    const ordersByType = orderController?.orders?.filter(
      (o) => o.menu_type === menuType.type
    );

    if (ordersByType && ordersByType.length) {
      print.push(`\n`);
      print.push(`\n`);
      print.push(`${fontBoldTitle}`);
      print.push(`${centerTextIn28Chars(menuTypeLabels[menuType.type])}`);
      for (const order of ordersByType) {
        print.push(`\n`);
        print.push(`\n`);
        print.push(`${fontBigTitle}`);
        print.push(`${order.quantity}  ${order.menu}`);
        if (order.description) {
          // Set a small font size for the description
          print.push(`\n`);
          print.push(`${fontSmall}`);
          print.push(
            order.description
              .split("/")
              .map((x) => ` >>${x}`)
              .join("\n")
          );

          // Reset to the original font size
          const fontSizeLarge = "\x1B\x21\x31";
          print.push(`${fontSizeLarge}`);
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

//option 2
// const printerTemplate = (orderController: IOrderController) => {
//   const fontBoldTitle = "\x1B\x21\x31";
//   const fontBigTitle = "\x1B\x21\x31";
//   const fontSmall = "\x1B\x21\x21";

//   const print = [
//     `
// ${fontBoldTitle}
// Table: ${orderController?.table_number} - ${orderController?.section}
// ${centerTextIn28Chars(`PASS ${orderController?.pass}`)}
// `
//   ];

//   for (const menuType of menuTypes) {
//     const ordersByType = orderController?.orders?.filter(
//       (o) => o.menu_type === menuType.type
//     );

//     if (ordersByType && ordersByType.length) {
//       print.push(`\n`);
//       print.push(`\n`);
//       print.push(`${fontBoldTitle}`);
//       print.push(`${centerTextIn28Chars(menuTypeLabels[menuType.type])}`);
//       for (const order of ordersByType) {
//         print.push(`\n`);
//         print.push(`\n`);
//         print.push(`${fontBigTitle}`);
//         print.push(`${order.quantity}  ${order.menu}`);
//         if (order.description) {
//           // Set a small font size for the description
//           print.push(`${fontSmall}`);
//           print.push(`\n`);
//           print.push(
//             order.description
//               .split("/")
//               .map((x) => ` >>${x}`)
//               .join("\n")
//           );

//           // Reset to the original font size
//           const fontSizeLarge = "\x1B\x21\x31";
//           print.push(`${fontSizeLarge}`);
//         }
//       }
//     }
//   }

//   print.push(`
// \n
// \n
// \n
// `);

//   return print.join("");
// };

export default printerTemplate;
