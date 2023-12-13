import { CartItem } from "../items/cart/cartItem.model";


export class UserDetails {
    public id: string;
    public email: string;
    public cart?: CartItem[] | null;

    constructor(
        id: string,
        email: string,
        cart?: CartItem[],
        
    ) {
        this.id = id;
        this.email = email;
        this.cart = cart || []; 
    }
}
