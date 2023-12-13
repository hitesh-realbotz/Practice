import { OrderItem } from "./order-item.model";

// export class Order {
//     public orderId: number;
//     public buyerId: string;
//     public billingName: string;
//     public contactNo: number;

//     public orderedItems: OrderItem[];

//     public totalPrice: number;
//     public time: Date;
//     public cancelled: boolean;

//     constructor(orderId: number, buyerId: string, billingName: string, contactNo: number, items: OrderItem[], totalPrice: number){
//         this.orderId = orderId;
//         this.buyerId = buyerId;
//         this.billingName = billingName;
//         this.contactNo = contactNo;
//         this.orderedItems = items;

//         this.totalPrice = totalPrice;

//         this.time = new Date();
//         this.cancelled = false;
//     }
// }
export class Order {
    public orderId?: number;
    public buyerId: string;
    public billingName: string;
    public contactNo: number;
    public address: string;
    public shippingMethod: string;   
    public totalPrice: number;
    public date: Date;
    public orderedItems?: OrderItem[];
    public cancelled: boolean;

    constructor(buyerId: string, billingName: string, contactNo: number, address: string,shippingMethod: string, totalPrice: number, orderId?: number, orderedItems?: OrderItem[]){
        this.orderId = orderId || null;
        this.buyerId = buyerId;
        this.billingName = billingName;
        this.contactNo = contactNo;
        this.address = address;
        this.shippingMethod = shippingMethod;
        this.orderedItems = orderedItems || [];
        this.totalPrice = totalPrice;
        this.date = new Date();
        this.cancelled = false;
    }
}


