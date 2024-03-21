export function convertCentsToEuro(
    amount: number | string,
    options?: Intl.NumberFormatOptions
): string {
    amount = Number(amount) / 100;
    return Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        ...options,
    }).format(Number(amount));
}

export function formatDate(date: Date) {
    // Extracting day, month, and year from the date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0, so we add 1
    const year = date.getFullYear();

    // Padding day and month with leading zeros if needed
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Creating the formatted date string in 'dd/MM/yyyy' format
    const formattedDate = formattedDay + '/' + formattedMonth + '/' + year;

    return formattedDate;
}

export function getTimeFromDate(date: Date) {
    // Extracting hours, minutes, and seconds from the input date
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Constructing the time string
    const timeString = `${hours}:${minutes}:${seconds}`;

    return timeString;
}

export const priceConverter = (price: number) => {
    if(price <= 0) return ''
    return (price / 100).toFixed(2);
}