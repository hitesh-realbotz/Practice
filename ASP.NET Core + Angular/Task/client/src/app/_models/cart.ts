import { CartItem } from "./cartItem";

export class Cart {
    public cartItems: CartItem[];
    public totalPrice: number;
    public totalCheckedPrice: number;

    
    constructor(cartItems: CartItem[], totalPrice: number, totalCheckedPrice: number) {
      this.cartItems = cartItems;
      this.totalPrice = totalPrice;
      this.totalCheckedPrice = totalCheckedPrice;
    }
  }
  