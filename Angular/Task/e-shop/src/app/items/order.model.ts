import { Item } from "./item.model";

export class Order{
    public orderId: number;
    public buyerId: number;
    public items: Item[];
}