import { Photo } from "./photo";

export interface Order {
    id: number;
    billingName: string;
    contactNo: number;
    address: string;
    shippingMethod: string;
    totalPrice: number;
    date: Date;
    orderItems?: OrderItem[];

    // constructor(billingName: string, contactNo: number, address: string, shippingMethod: string, totalPrice: number, id?: number, orderedItems?: OrderItem[]) {
    //     this.id = id || 0;    
    //     this.billingName = billingName;
    //     this.contactNo = contactNo;
    //     this.address = address;
    //     this.shippingMethod = shippingMethod;
    //     this.orderItems = orderedItems || [];
    //     this.totalPrice = totalPrice;
    //     this.date = new Date();
    // }

}

export interface OrderItem {
    quantity: number;  
    unitPrice: number; 
    totalPrice: number;
    photoUrl: string;
    orderBook?: OrderBook; 
}

export interface OrderBook {
    title: string;
    author: string;
    isbn: string;
    description: string;
    bookId: number;
   

}