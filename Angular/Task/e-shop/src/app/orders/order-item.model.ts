import { CartItem } from "../items/cart/cartItem.model";

export class OrderItem {
    public name: string;
    public itemId: number;
    public image: string;
    public description: string;
    public category: string;
    public qty: number;
    public price: number;
    public sellerId: string;


    constructor(item: CartItem) {

        this.name = item.item.name;
        this.itemId = item.item.itemId;
        this.image = item.item.image;
        this.description = item.item.description;
        this.category = item.item.category;
        this.qty = item.qty;
        this.price = item.item.price;
        this.sellerId = item.item.sellerId;

    }
}