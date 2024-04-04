import { IOrder } from "../../interface/restaurant/orders";

export const menuTypeLabels: { [key: string]: string } = {
    Starters: "--- STARTERS ---",
    "Main Course": "--- MAIN COURSE ---",
    Bar: "--- BAR ---",
    Sides: "--- EXTRA SIDES ---",
    Desserts: "--- DESSERTS ---",
};

export const menuTypes = [
    { type: "Starters", label: "--- STARTERS ---" },
    { type: "Main Course", label: "--- MAIN COURSE ---=" },
    { type: "Sides", label: "--- EXTRA SIDES ---" },
    { type: "Bar", label: "--- BAR ---" },
    { type: "Desserts", label: "--- DESSERTS ---" },
];

export function centerTextIn28Chars(text: string) {
    const padding = 28 - text.length;
    const leftPadding = Math.floor(padding / 2);
    const rightPadding = Math.ceil(padding / 2);
    const centeredText =
        "-".repeat(leftPadding) + " " + text + " " + "-".repeat(rightPadding);
    return centeredText;
}

export const getOrderItemTotal = (order: IOrder) => {
    let addOnsTotal = 0
    if (order?.add_ons) {
        addOnsTotal += order?.add_ons.reduce((acc, curr) => acc + curr.price, 0);
    }
    return (((order.quantity * order.price) + addOnsTotal) / 100).toFixed(2);
}