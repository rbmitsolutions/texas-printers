export const menuTypeLabels: { [key: string]: string } = {
    Starters: "=== Starters ===",
    "Main Course": "=== Main Course ===",
    Bar: "=== Bar ===",
    Sides: "=== Extra Sides ===",
    Desserts: "=== Desserts ===",
};

export const menuTypes = [
    { type: "Starters", label: "=== Starters ===" },
    { type: "Main Course", label: "=== Main Course ====" },
    { type: "Sides", label: "=== Extra Sides ===" },
    { type: "Bar", label: "=== Bar ===" },
    { type: "Desserts", label: "=== Desserts ===" },
];

export function centerTextIn28Chars(text: string) {
    const padding = 28 - text.length;
    const leftPadding = Math.floor(padding / 2);
    const rightPadding = Math.ceil(padding / 2);
    const centeredText =
        "=".repeat(leftPadding) + " " + text + " " + "=".repeat(rightPadding);
    return centeredText;
}
