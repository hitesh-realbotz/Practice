import { Book } from "./book";

export class Cart {
    public cartItem: CartItem[];
    public totalPrice: number;
    public totalCheckedPrice: number;

    
    constructor(cartItem: CartItem[], totalPrice: number, totalCheckedPrice: number) {
      this.cartItem = cartItem;
      this.totalPrice = totalPrice;
      this.totalCheckedPrice = totalCheckedPrice;
    }
  }
  
export class CartItem {
    public book: Book;
    public qty: number;
    public checked: boolean;
    public totalPrice: number;
    
    constructor(book: Book, qty: number, totalPrice: number, checked: boolean) {
      this.book = book;
      this.qty = qty;
      this.checked = checked;
      this.totalPrice = totalPrice;
    }
  }