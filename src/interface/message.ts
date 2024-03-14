import { IOrder, IOrderController, ITable } from "./restaurant/orders"

export type IMessageVariables =
    | ({
        type: 'order' | 'bill' | 'to'
        | 0
    } & IMessageDefault)
    | IOrderMessage
    | IBillMessage
    | IToMessage

export interface IMessageDefault {
    type: 'order' | 'bill' | 'to'
    table: ITable
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
}

export interface IToMessage {
    type: 'to'
    ip: string
    table: ITable
    order_controller: IOrderController;
}