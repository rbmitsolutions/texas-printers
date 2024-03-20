import { IOrder, IOrderController, ITable } from "./restaurant/orders"

export type IMessageVariables =
    | ({
        type: 'order' | 'bill' | 'to' | 'gift-card'
        | 0
    } & IMessageDefault)
    | IOrderMessage
    | IBillMessage
    | IToMessage

export interface IMessageDefault {
    type: 'order' | 'bill' | 'to' | 'gift-card'
}

export interface IOrderMessage {
    type: 'order'
    table: ITable
    order_controller: IOrderController;
}

export interface IBillMessage {
    type: 'bill'
    ip: string
    table: ITable
    orders: IOrder[]
    total: number
    transaction_method?: TransactionsMethod
}

export interface IToMessage {
    type: 'to'
    ip: string
    table: ITable
    order_controller: IOrderController;
}

export interface IGiftCardMessage {
    type: 'gift-card',
    ip: string
    total: number
    transaction_method?: TransactionsMethod
}

export enum TransactionsMethod {
    CASH = "cash",
    CARD = "card",
    PAYROLL = "payroll",
    GIFT_CARD = "gift-card",
}