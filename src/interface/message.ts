import { IOrder, IOrderController, ITable } from "./restaurant/orders"

export type IMessageVariables =
    | ({
        type: 'order' | 'bill' | 'to' | 'gift-card' | 'open-till' | 'gift-card-balance'
        | 0
    } & IMessageDefault)
    | IOrderMessage
    | IBillMessage
    | IToMessage

export interface IMessageDefault {
    type: 'order' | 'bill' | 'to' | 'gift-card' | 'open-till' | 'gift-card-balance'
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
    code: string
    transaction_method?: TransactionsMethod
}

export interface IOpenTillMessage {
    type: 'open-till',
    ip: string
}

export interface IGiftCardBalanceMessage {
    type: 'gift-card-balance',
    ip: string
    code: string
    balance: number
}

export enum TransactionsMethod {
    CASH = "cash",
    CARD = "card",
    PAYROLL = "payroll",
    GIFT_CARD = "gift-card",
}