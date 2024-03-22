import { IOrder } from "../interface/restaurant/orders";

export const organizeOrder = (orders: IOrder[]): IOrder[] => {
    const combinedOrders: { [id: string | number]: IOrder } = {};

    orders?.forEach(ord => {
        const menuId = ord?.menu_id;
        // If the menu_id already exists in the combinedOrders, increment the quantity
        if (combinedOrders[menuId]) {
            const addOns = ord?.add_ons?.filter(addon => addon?.add_ons_id !== "49d10452-d4d0-41c4-8f78-79f0cb46f875" && addon?.add_ons_id !== '58237065-9c2f-4c71-ae5f-7d957cea7a78')
            
            let oneAddOnTitle: string[] = []
            let addOnsTotal = 0

            addOns?.map(addOn => {
                if(ord?.quantity > 1) {
                    oneAddOnTitle?.push(`${ord?.quantity} ${addOn?.title}`)
                    addOnsTotal += (addOn?.price || 0) * ord?.quantity
                } else {
                    oneAddOnTitle?.push(addOn?.title)
                    addOnsTotal += addOn?.price || 0
                }
            })

            combinedOrders[menuId].quantity += ord.quantity;

            if(oneAddOnTitle?.length > 0) { 
                combinedOrders[menuId].add_ons.push({
                    title: oneAddOnTitle?.join(' - '),
                    add_ons_id: '1',
                    add_ons_opt_id: '1',
                    price: addOnsTotal,
                    is_mandatory: false,
                })
            }

            const sides = ord?.add_ons?.filter(addon => addon?.add_ons_id === "49d10452-d4d0-41c4-8f78-79f0cb46f875" || addon?.add_ons_id === '58237065-9c2f-4c71-ae5f-7d957cea7a78')

            sides?.forEach(side => {
                const isAdded = combinedOrders[side?.add_ons_opt_id]
                if (isAdded?.id === side?.add_ons_opt_id) {
                    combinedOrders[side?.add_ons_opt_id].quantity += Number(ord?.quantity)
                    return
                } else if (!isAdded) {
                    combinedOrders[side?.add_ons_opt_id] = {
                        id: side?.add_ons_opt_id,
                        add_ons: [],
                        menu: side?.title,
                        menu_id: side?.add_ons_id,
                        menu_short_title: side?.title,
                        quantity: 1,
                        mn_section: 'Sides',
                        price: side?.price,
                        status: 'ordered' as any,
                        to_print_ips: ord?.to_print_ips,
                        mn_type: 'Sides' as any,
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
                        mn_section: 'Sides',
                        price: side.price,
                        status: 'ordered' as any,
                        to_print_ips: ord?.to_print_ips,
                        mn_type: 'Sides' as any,
                        order_controller_id: '',
                        order_controller: {} as any,
                        paid: 0,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }
                }
            })

            let oneAddOnTitle: string[] = []
            let addOnsTotal = 0

            addOns?.map(addOn => {
                if(ord?.quantity > 1) {
                    oneAddOnTitle?.push(`${ord?.quantity} ${addOn?.title}`)
                    addOnsTotal += (addOn?.price || 0) * ord?.quantity
                } else {
                    oneAddOnTitle?.push(addOn?.title)
                    addOnsTotal += addOn?.price || 0
                }
            })
            combinedOrders[menuId as string] = {
                ...ord,
                add_ons: oneAddOnTitle?.length > 0 ?[{
                    title: oneAddOnTitle?.join(' - '),
                    add_ons_id: '1',
                    add_ons_opt_id: '1',
                    price: addOnsTotal,
                    is_mandatory: false,
                }] : [],
            };
        }
    });

    return Object.values(combinedOrders)
}