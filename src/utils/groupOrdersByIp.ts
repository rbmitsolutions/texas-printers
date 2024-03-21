import { IOrder } from "../interface/restaurant/orders";

export interface IPrintGroup {
    ip: string;
    orders: IOrder[];
}

export const groupOrdersByIP = (orders: IOrder[]): IPrintGroup[] => {
    const combinedOrders: { [id: string | number]: IOrder } = {};

    orders?.forEach(ord => {
        const menuId = ord?.menu_id;
        console.log(ord)
        // If the menu_id already exists in the combinedOrders, increment the quantity
        if (combinedOrders[menuId]) {
            const addOns = ord?.add_ons?.filter(addon => addon?.add_ons_id !== "49d10452-d4d0-41c4-8f78-79f0cb46f875" && addon?.add_ons_id !== '58237065-9c2f-4c71-ae5f-7d957cea7a78')

            combinedOrders[menuId].quantity += ord.quantity;
            combinedOrders[menuId].add_ons.push(...addOns)

            const sides = ord?.add_ons?.filter(addon => addon?.add_ons_id === "49d10452-d4d0-41c4-8f78-79f0cb46f875" || addon?.add_ons_id === '58237065-9c2f-4c71-ae5f-7d957cea7a78')

            sides?.forEach(side => {
                const isAdded = combinedOrders[side?.add_ons_opt_id]
                if (isAdded?.id === side?.add_ons_opt_id) {
                    combinedOrders[side?.add_ons_opt_id].quantity += 1
                    return
                } else if (!isAdded) {
                    combinedOrders[side?.add_ons_opt_id] = {
                        id: side?.add_ons_opt_id,
                        add_ons: [],
                        menu: side?.title,
                        menu_id: side?.add_ons_id,
                        menu_short_title: side?.title,
                        quantity: 1,
                        mn_section: '',
                        price: side.price,
                        status: 'ordered' as any,
                        to_print_ips: ord?.to_print_ips,
                        mn_type: '' as any,
                        order_controller_id: '',
                        order_controller: {} as any,
                        paid: 0,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }
                }
            })

        }

        else {
            const addOns = ord?.add_ons?.filter(addon => addon?.add_ons_id !== "49d10452-d4d0-41c4-8f78-79f0cb46f875" && addon?.add_ons_id !== '58237065-9c2f-4c71-ae5f-7d957cea7a78')

            const sides = ord?.add_ons?.filter(addon => addon?.add_ons_id === "49d10452-d4d0-41c4-8f78-79f0cb46f875" || addon?.add_ons_id === '58237065-9c2f-4c71-ae5f-7d957cea7a78')

            sides?.forEach(side => {
                const isAdded = combinedOrders[side?.add_ons_opt_id]
                if (isAdded?.id === side?.add_ons_opt_id) {
                    combinedOrders[side?.add_ons_opt_id].quantity += 1
                    return
                } else if (!isAdded) {
                    combinedOrders[side?.add_ons_opt_id] = {
                        id: side?.add_ons_opt_id,
                        add_ons: [],
                        menu: side?.title,
                        menu_id: side?.add_ons_id,
                        menu_short_title: side?.title,
                        quantity: 1,
                        mn_section: '',
                        price: side.price,
                        status: 'ordered' as any,
                        to_print_ips: ord?.to_print_ips,
                        mn_type: '' as any,
                        order_controller_id: '',
                        order_controller: {} as any,
                        paid: 0,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }
                }
            })
            combinedOrders[menuId as string] = {
                ...ord,
                add_ons: addOns
            };
        }
    });

    const combinedOrdersArray = Object.values(combinedOrders)

    const printGroups: { [ip: string]: IOrder[] } = {};

    combinedOrdersArray?.forEach(order => {
        order?.to_print_ips.forEach(ip => {
            if (!printGroups[ip]) {
                printGroups[ip] = [];
            }
            printGroups[ip].push(order);
        });
    });

    return Object.entries(printGroups).map(([ip, orders]) => ({ ip, orders }));
}


